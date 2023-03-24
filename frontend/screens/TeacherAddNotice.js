import { useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";

import IconButton from "../components/icons/IconButton";

import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import TeacherAddNoticeForm from "../components/Form/TeacherAddNoticeForm";

const TeacherAddNotice = ({ route, navigation }) => {
  const NoticeIDMongo = route.params?.NoticeID;
  const isEditing = !!NoticeIDMongo;
  const isFocused = useIsFocused();

  const {
    alertText,
    showAlert,
    getAllSubjects,
    teacherAddNotice,
    teacherDeleteNotice,
    teacherAllNotices,
    teacherUpdateNotice,
  } = useAppContext();

  const noticeDataForForm = teacherAllNotices.find(
    (notice) => notice._id === NoticeIDMongo
  );

  useEffect(() => {
    if (isFocused) {
      getAllSubjects();
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Notice" : "Add Notice",
    });
  }, [navigation]);

  const deleteNoticeHandler = () => {
    teacherDeleteNotice(NoticeIDMongo);
    return Alert.alert("Success", "Delete Notice success", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const cancleHandler = () => {
    navigation.goBack();
  };

  //form submit handler
  const confirmHandler = (title, description, link, date, color) => {
    if (!title || !description || !link || !date || !color) {
      return Alert.alert("Unsuccess", "Please enter all values!", [
        { text: "OK" },
      ]);
    } else {
      if (isEditing) {
        teacherUpdateNotice(NoticeIDMongo, {
          title,
          description,
          link,
          date,
          color,
        });
        return Alert.alert("Success", "Notice update success", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        teacherAddNotice({
          title,
          description,
          link,
          date,
          color,
        });
        return Alert.alert("Success", "Grade Added success", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TeacherAddNoticeForm
        labelName1="Grade"
        labelName2={isEditing ? true : false}
        onCancel={cancleHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValuesForEdit={noticeDataForForm ? noticeDataForForm : null}
        alertText={alertText}
        showAlert={showAlert}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color="green"
            size={36}
            onPressProp={deleteNoticeHandler}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default TeacherAddNotice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#200364",
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
    marginBottom: 30,
    paddingBottom: 8,
    borderTopWidth: 2,
    borderTopColor: "#a281f0",
    alignItems: "center",
  },
});
