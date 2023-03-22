import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../constants/styles";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredTeacherSub, setEnteredTeacherSub] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredTeacherDes, setEnteredTeacherDes] = useState("");

  const dropDownData = [
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ];
  const dropDownDataGrade = [
    { label: "Grade 5", value: "Grade 5" },
    { label: "Grade 6", value: "Grade 6" },
    { label: "Grade 7", value: "Grade 7" },
    { label: "Grade 8", value: "Grade 8" },
    { label: "Grade 9", value: "Grade 9" },
    { label: "Grade 10", value: "Grade 10" },
    { label: "Grade 11", value: "Grade 11" },
    { label: "Grade 12", value: "Grade 12" },
    { label: "Grade 13", value: "Grade 13" },
  ];

  const [dropValue, setDropValue] = useState(null);
  const [dropValueGrade, setdropValueGrade] = useState(null);

  const {
    firstName: firstNameIsInvalid,
    lastName: lastNameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "firstName":
        setEnteredFirstName(enteredValue);
        break;
      case "lastName":
        setEnteredLastName(enteredValue);
        break;
      case "subject":
        setEnteredTeacherSub(enteredValue);
        break;
      case "description":
        setEnteredTeacherDes(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      teacherSubject: enteredTeacherSub,
      Grade: dropValueGrade,
      type: dropValue,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      teacherDescription: enteredTeacherDes,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <Dropdown
            data={dropDownData}
            labelField="label"
            valueField="value"
            value={dropValue}
            onChange={(item) => {
              setDropValue(item.value);
            }}
            style={styles.dropown}
            placeholder="Select Account Type"
          />
        )}

        {!isLogin && (dropValue == "teacher" || dropValue == "student") && (
          <Dropdown
            data={dropDownDataGrade}
            labelField="label"
            valueField="value"
            value={dropValueGrade}
            onChange={(item) => {
              setdropValueGrade(item.value);
            }}
            style={styles.dropown}
            placeholder="Select Grade"
          />
        )}

        {!isLogin && (
          <Input
            label="First Name"
            onUpdateValue={updateInputValueHandler.bind(this, "firstName")}
            value={enteredFirstName}
            // keyboardType=""
            isInvalid={firstNameIsInvalid}
            placeholder="First Name"
          />
        )}

        {!isLogin && (
          <Input
            label="Last Name"
            onUpdateValue={updateInputValueHandler.bind(this, "lastName")}
            value={enteredLastName}
            // keyboardType=""
            isInvalid={lastNameIsInvalid}
            placeholder="Last Name"
          />
        )}

        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          placeholder="Your email"
        />

        {!isLogin && dropValue == "teacher" && (
          <Input
            label="Subject"
            onUpdateValue={updateInputValueHandler.bind(this, "subject")}
            value={enteredTeacherSub}
            // isInvalid={lastNameIsInvalid}
            placeholder="Subject"
          />
        )}

        {!isLogin && dropValue == "teacher" && (
          <Input
            label="Description"
            onUpdateValue={updateInputValueHandler.bind(this, "description")}
            value={enteredTeacherDes}
            // isInvalid={lastNameIsInvalid}
            placeholder="Description"
          />
        )}

        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          placeholder="Password"
        />

        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            placeholder="Confirm Password"
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler} color="#09b88e">
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  dropown: {
    marginVertical: 8,
    backgroundColor: Colors.InputBackgroudColor,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  form: {
    alignContent: "center",
    justifyContent: "center",
  },
});
