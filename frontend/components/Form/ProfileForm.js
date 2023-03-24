import { useState } from "react";
import { View, StyleSheet, Text, Alert, ScrollView } from "react-native";

import AdminInput from "./AdminInput";
import Button from "../icons/Button";
import { Colors } from "../../constants/styles";

const ProfileForm = ({
  labelName1,
  labelName2,
  labelName3,
  labelName4,
  labelName5,
  labelName6,
  onCancel,
  updateProfileHandler,
  user,
  GradeValueForNewSubject,
}) => {
  const [fname, setFname] = useState(user.firstName);
  const [lname, setLname] = useState(user.lastName);
  const [grade, setGrade] = useState(user.Grade);
  const [subject, setSubject] = useState(user.teacherSubject);
  const [email, setEmail] = useState(user.email);
  const [type, setType] = useState(user.type);
  const [description, setDescription] = useState(user.teacherDescription);

  //subject input handler
  const subjectChangeHandler = (enteredAmount) => {
    setSubject(enteredAmount);
  };

  //description input handler
  const descriptionChangeHandler = (enteredAmount) => {
    setDescription(enteredAmount);
  };

  //grade input Handler

  const fNameChangeHandler = (enteredAmount) => {
    setFname(enteredAmount);
  };

  const lNameChangeHandler = (enteredAmount) => {
    setLname(enteredAmount);
  };

  const gradeChangeHandler = (enteredAmount) => {
    setGrade(enteredAmount);
  };

  //for subject
  const sumbitHandler = () => {
    //validate input
    //CHECK STRING CONTAINS NUMBER FUNCTION
    function containsNumbers(str) {
      return /\d/.test(str);
    }

    const checkfirstNameHasNumber = containsNumbers(fname);
    const checklastNameHasNumber = containsNumbers(lname);

    const checkfirstName = !!fname;
    const checklastName = !!lname;

    if (checkfirstNameHasNumber || checklastNameHasNumber) {
      Alert.alert(
        "Invalid Input",
        "Subject name cannot contain numeric values"
      );
      return;
    }

    if (!checkfirstName || !checklastName) {
      Alert.alert("Invalid Input", "Please provide All values");
      return;
    }

    const userMogoID = user._id;
    updateProfileHandler(
      userMogoID,
      fname,
      lname,
      email,
      subject,
      grade,
      description,
      type
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>My Profile</Text>
        <AdminInput
          label={labelName1}
          textInputAllProps={{
            onChangeText: fNameChangeHandler,
            value: fname,
          }}
          profile
        />

        <AdminInput
          label={labelName2}
          textInputAllProps={{
            onChangeText: lNameChangeHandler,
            value: lname,
          }}
          profile
        />

        {user.Grade !== "no" && (
          <AdminInput
            label={labelName3}
            textInputAllProps={{
              onChangeText: gradeChangeHandler,
              value: grade,
            }}
            profile
          />
        )}

        {user.teacherSubject !== "no" && user.type === "teacher" && (
          <AdminInput
            label={labelName4}
            textInputAllProps={{
              onChangeText: subjectChangeHandler,
              value: subject,
            }}
            profile
          />
        )}

        <AdminInput
          label={labelName5}
          textInputAllProps={{
            onChangeText: fNameChangeHandler,
            value: email,
            editable: false,
          }}
          profile
        />

        {user.teacherDescription !== "no" && (
          <AdminInput
            label={labelName6}
            textInputAllProps={{
              onChangeText: descriptionChangeHandler,
              value: description,
            }}
            profile
          />
        )}

        <View style={styles.buttons}>
          <Button
            onPressProp={sumbitHandler}
            style={styles.button}
            color="#09b88e"
            fontSize={17}
          >
            update
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryBackgroud,
    opacity: 0.9,
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
