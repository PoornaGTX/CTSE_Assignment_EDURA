import { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthForm from "./AuthForm";
import { Colors } from "../constants/styles";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  //navigation method to login or signUp
  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
      // navigation.replace(); //not provide back button
    }
  }

  //navigation method to Forgot Password
  function ForgotPasswordHandler() {
    navigation.navigate("ForgotPassword");
    // navigation.replace(); //not provide back button
  }

  //for login
  function submitHandler(credentials) {
    let { email, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  //for signUp
  function submitHandlerSignUp(credentials) {
    let {
      firstName,
      lastName,
      email,
      teacherSubject,
      Grade,
      type,
      password,
      confirmPassword,
      teacherDescription,
    } = credentials;
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const firstNameIsInvalid = !!firstName;
    const lastNameIsInvalid = !!lastName;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
      //   (!passwordsAreEqual || !lastNameIsInvalid || !!firstNameIsInvalid))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        firstName: !firstNameIsInvalid,
        lastName: !lastNameIsInvalid,
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({
      firstName,
      lastName,
      email,
      teacherSubject,
      Grade,
      type,
      password,
      teacherDescription,
    });
  }

  return (
    <ScrollView
      style={[styles.authContent, isLogin && { marginTop: 60 }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.forgetText}>{isLogin ? "Login" : "Sign Up"}</Text>
      <AuthForm
        isLogin={isLogin}
        onSubmit={isLogin ? submitHandler : submitHandlerSignUp}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Pressable onPress={switchAuthModeHandler}>
          {isLogin ? (
            <Text style={styles.forgetPasswordText}>CREATE NEW ACCOUNT</Text>
          ) : (
            <Text style={styles.forgetPasswordText}>Log in instead</Text>
          )}
        </Pressable>

        {!!isLogin && (
          <Pressable onPress={ForgotPasswordHandler}>
            <Text style={styles.forgetPasswordText}>FORGOT PASSWORD ?</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 10,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.formBackground,
    // elevation: 2,
    // shadowColor: "black",
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.35,
    // shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  forgetPasswordText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
    fontSize: 16,
  },
  forgetText: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonSpace: {
    marginTop: 20,
  },
});
