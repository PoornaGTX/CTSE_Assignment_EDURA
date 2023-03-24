import { useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";

import IconButton from "../components/icons/IconButton";
import AdminForm from "../components/Form/AdminForm";
import { Colors } from "../constants/styles";

import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";

const ManageGradesScreen = ({ route, navigation }) => {
  const GradeID = route.params?.GradeNumberID;
  const GradeIDMongo = route.params?.GradeID;
  const isEditing = !!GradeID;
  const isFocused = useIsFocused();

  const {
    grades,
    getAllGrades,
    alertText,
    showAlert,
    updateGrade,
    deleteGrade,
    getAllSubjects,
    subjects,
    addGrade,
  } = useAppContext();

  const gardeDataForForm = grades.find((grade) => grade._id === GradeIDMongo);

  useEffect(() => {
    if (isFocused) {
      getAllGrades();
      getAllSubjects();
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Grade" : "Add Grade",
    });
  }, [navigation]);

  const deleteGradeHandler = () => {
    //check if exisiting grade has subjects
    const checkExsisitigGrade = subjects.some(
      (subject) => subject.gID === gardeDataForForm.Grade
    );

    if (checkExsisitigGrade) {
      return Alert.alert("Sorry", "Sorry you cant grade that has subjects", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }

    deleteGrade(GradeIDMongo);

    return Alert.alert("Success", "Delete subject success", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const cancleHandler = () => {
    navigation.goBack();
  };

  //form submit handler
  const confirmHandler = (gradeValue, mongoGradeeID, colorGrade) => {
    //GradeID,Grade, colorselect
    const colorforEdit = !!colorGrade;

    const checkValue = gradeValue.slice(0, 5);

    //to check whether grade inpurt start with "Grade"
    if (!(checkValue === "Grade")) {
      return Alert.alert("Invalid Grade", "You Enterd invalid grade type", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }

    //check if exisiting grade already in the DB

    const checkExsisitigGrade = grades.some(
      (grade) => grade.Grade === gradeValue && grade.color === colorGrade
    );
    if (checkExsisitigGrade) {
      return Alert.alert("DB ERROR", "Sorry Grade is already in DB", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }

    if (isEditing) {
      const checkExsisitigGrade = grades.some(
        (grade) => grade.Grade === gradeValue
      );
      if (checkExsisitigGrade) {
        return Alert.alert("DB ERROR", "Sorry Grade is already in DB!!!!!!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    }

    if (!isEditing) {
      const checkExsisitigGrade = grades.some(
        (grade) => grade.Grade === gradeValue
      );
      if (checkExsisitigGrade) {
        return Alert.alert("DB ERROR", "Sorry Grade is already in DB!!!!!!");
      }
    }

    if (isEditing) {
      updateGrade(mongoGradeeID, {
        Grade: gradeValue,
        color: colorforEdit && colorGrade,
      });

      return Alert.alert("Success", "Grade update success", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      addGrade({
        Grade: gradeValue,
        color: colorGrade,
      });
      return Alert.alert("Success", "Grade Added success", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <AdminForm
        labelName1="Grade"
        labelName2={false}
        Grade={GradeID}
        onCancel={cancleHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValuesForEdit={gardeDataForForm}
        alertText={alertText}
        showAlert={showAlert}
        Manage
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color="black"
            size={40}
            onPressProp={deleteGradeHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageGradesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primaryBackgroud,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#a281f0",
    alignItems: "center",
  },
});
