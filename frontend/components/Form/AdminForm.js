import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import AdminInput from "./AdminInput";
import Button from "../icons/Button";
import ColorPixer from "../colorPixer/ColorPixer";

const AdminForm = ({
  labelName1,
  labelName2,
  Grade,
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValuesForEdit,
  GradeValueForNewSubject,
  Manage,
}) => {
  const [subjectValue, setSubjectValue] = useState(
    defaultValuesForEdit ? defaultValuesForEdit.subjectName : ""
  );

  const [colorSub, setColorSub] = useState(
    defaultValuesForEdit ? defaultValuesForEdit.color : ""
  );

  const [gradeValue, setGradeValue] = useState(
    defaultValuesForEdit ? defaultValuesForEdit.Grade : ""
  );

  const [colorGrade, setColorGrade] = useState(
    defaultValuesForEdit ? defaultValuesForEdit.color : ""
  );

  //subject input handler
  const subjectChangeHandler = (enteredAmount) => {
    setSubjectValue(enteredAmount);
  };

  //grade input Handler

  const gradeChangeHandler = (enteredAmount) => {
    setGradeValue(enteredAmount);
  };

  //subject color handler
  const subjectColorHandler = (colorselect) => {
    setColorSub(colorselect);
  };

  //grade color handler
  const gradeColorHandler = (colorselect) => {
    setColorGrade(colorselect);
  };

  //for subject
  const sumbitHandler = () => {
    //validate subject input
    //CHECK STRING CONTAINS NUMBER FUNCTION
    function containsNumbers(str) {
      return /\d/.test(str);
    }

    const checkSubjectHasNumber = containsNumbers(subjectValue);
    const checkSubjectNotEmpty = !!subjectValue;
    const checkColorSelect = !!colorSub;

    if (checkSubjectHasNumber || !checkSubjectNotEmpty) {
      {
        checkSubjectHasNumber
          ? Alert.alert(
              "Invalid Input",
              "Subject name cannot contain numeric values"
            )
          : Alert.alert("Invalid Input", "Please enter subject name");
      }
      return;
    }

    if (!checkColorSelect) {
      Alert.alert("Invalid Input", "Please select color for subject");
      return;
    }

    onSubmit(subjectValue, GradeValueForNewSubject, colorSub);
  };

  //for Grade
  const sumbitHandlerGrade = () => {
    const checkSubjectNotEmpty = !!gradeValue;
    const checkColorSelect = !!colorGrade;

    if (!checkSubjectNotEmpty) {
      Alert.alert("Invalid Input", "Please Provide Grade Value");
      return;
    }

    if (!checkColorSelect) {
      Alert.alert("Invalid Input", "Please Provide Color for Grade");
      return;
    }
    const mongoGradeeID = defaultValuesForEdit?._id;
    onSubmit(gradeValue, mongoGradeeID, colorGrade);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>
        {labelName2 === false ? "Grade Manager" : "Subject Manager"}
      </Text>
      <AdminInput
        label={labelName1}
        textInputAllProps={{
          onChangeText: gradeChangeHandler,
          value: gradeValue || Grade || GradeValueForNewSubject,
          editable: !labelName2,
        }}
        Manage
      />
      {labelName2 && (
        <AdminInput
          label={labelName2}
          textInputAllProps={{
            onChangeText: subjectChangeHandler,
            value: subjectValue,
          }}
        />
      )}
      <View style={styles.selectColorView}>
        <Text style={styles.colorTilte}>
          {labelName2 ? "Select Color for Subject" : "Select Color for Grade"}
        </Text>
        <View
          style={[
            styles.viewSelect,
            { backgroundColor: labelName2 ? colorSub : colorGrade },
          ]}
        ></View>
      </View>

      <View style={styles.colorViewContainer}>
        <ColorPixer
          subjectColor="#f54242"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#f05da9"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#636df2"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#f5d142"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#d0d0d6"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#41d95d"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#c9d5f0"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#9eecff"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#ffc7ff"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="black"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#ffdc8f"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#e386fc"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#dee6a8" //
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
        <ColorPixer
          subjectColor="#9e8cfa"
          onPressProp={labelName2 ? subjectColorHandler : gradeColorHandler}
        />
      </View>

      <View style={styles.buttons}>
        <Button mode="flat" onPressProp={onCancel} style={styles.button}>
          Cancle
        </Button>
        <Button
          onPressProp={labelName2 ? sumbitHandler : sumbitHandlerGrade}
          style={styles.button}
          color="#09b88e"
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default AdminForm;

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
    marginTop: 10,
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
