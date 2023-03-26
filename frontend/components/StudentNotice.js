import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import TeacherInput from "./Form/TeacherInput";

const StudentNotice = ({
  labelName2,
  titleProp,
  descriptionProp,
  linkProp,
  dateProp,
}) => {
  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>{labelName2}</Text>
      <TeacherInput
        label="Title"
        textInputAllProps={{
          //   onChangeText: titleChangeHandler,
          value: titleProp,
          editable: !labelName2,
        }}
      />
      <TeacherInput
        label="Description"
        textInputAllProps={{
          //   onChangeText: descriptionChangeHandler,
          value: descriptionProp,
          editable: !labelName2,
        }}
      />
      <TeacherInput
        label="Link"
        textInputAllProps={{
          //   onChangeText: linkChangeHandler,
          value: linkProp,
          editable: !labelName2,
        }}
      />
      <TeacherInput
        label="date"
        textInputAllProps={{
          //   onChangeText: dateChangeHandler,
          value: dateProp,
          editable: !labelName2,
        }}
      />
    </View>
  );
};

export default StudentNotice;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 16,
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

  colorTilte: {
    marginHorizontal: 4,
    marginVertical: 8,
    fontSize: 14,
    color: "#c6affc",
    marginBottom: 4,
    fontWeight: "bold",
  },

  colorViewContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  selectColorView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewSelect: {
    height: 15,
    width: 15,
    marginHorizontal: 8,
    marginTop: 5,
  },
});
