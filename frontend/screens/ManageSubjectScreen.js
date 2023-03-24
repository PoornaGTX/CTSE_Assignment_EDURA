import { useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";

//components
import IconButton from "../components/icons/IconButton";
import AdminForm from "../components/Form/AdminForm";

import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import { Colors } from "../constants/styles";

const ManageSubjectScreen = ({ route, navigation }) => {
  const subjectID = route.params?.subID; //this contain mongoose _id
  const Grade = route.params?.Grade; //this contain gradeID 'Grade 1'
  const isEditing = !!subjectID;
  const isFocused = useIsFocused();

  const { updateSubject, getAllSubjects, subjects, deleteSubject, addSubject } =
    useAppContext();

  //grade id coming from adding new subject
  const addNewSubjectGradeValue = route.params?.gradeNameID; //this contain gradeID 'Grade 1'

  const subjectDataForForm = subjects.find(
    (subject) => subject._id === subjectID
  );

  useEffect(() => {
    if (isFocused) {
      getAllSubjects();
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Subject" : "Add Subject",
    });
  }, [navigation, isEditing]);

  const deleteSubjectHnadler = async () => {
    deleteSubject(subjectID);

    navigation.goBack();
  };

  const cancleHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (SubName, GradeID, colorselect) => {
    const colorforEdit = !!colorselect;

    //check if exisiting grade already in the DB
    //for edit subject
    if (isEditing) {
      const checkExsisitigSubject = subjects.some(
        (subject) =>
          subject.subjectName === SubName && subject.color === colorselect
        // subject.gID === Grade
      );
      if (checkExsisitigSubject) {
        return Alert.alert("DB ERROR", "Sorry Subject is already in DB11");
      }
      //for adding new subject
    } else {
      const checkExsisitigSubject = subjects.some(
        (subject) => subject.subjectName === SubName && subject.gID === Grade
      );
      if (checkExsisitigSubject) {
        return Alert.alert("DB ERROR", "Sorry Subject is already in DB1");
      }
    }

    if (isEditing) {
      updateSubject(subjectID, {
        subjectName: SubName,
        color: colorforEdit && colorselect,
      });
      return Alert.alert("Success", "subject update success", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      addSubject({
        subjectName: SubName,
        gID: GradeID,
        color: colorselect,
      });
      return Alert.alert("Success", "subject added success", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AdminForm
        labelName1="Grade"
        labelName2="Subject"
        Grade={Grade}
        onCancel={cancleHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValuesForEdit={subjectDataForForm}
        GradeValueForNewSubject={addNewSubjectGradeValue}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color="black"
            size={36}
            onPressProp={deleteSubjectHnadler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageSubjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primaryBackgroud,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#a281f0",
    alignItems: "center",
  },
});
