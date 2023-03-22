import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { useAppContext } from "../context/appContext";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { registerUser } = useAppContext();

  const signupHandler = async ({
    firstName,
    lastName,
    email,
    teacherSubject,
    Grade,
    type,
    password,
    teacherDescription,
  }) => {
    setIsAuthenticating(true);
    try {
      registerUser({
        firstName,
        lastName,
        email,
        teacherSubject,
        Grade,
        type,
        password,
        teacherDescription,
      });
    } catch (error) {
      Alert.alert(
        "Authntication failed!",
        "Could not log you in. Please check credentials or try again later"
      );
      setIsAuthenticating(false);
    }
  };

  // if (isAuthenticating) {
  //   return <LoadingOverlay message="Creating user..." />;
  // }

  return (
    <LinearGradient colors={["black", "black"]} style={styles.container}>
      <ImageBackground
        source={images.LoginImage}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <ScrollView style={styles.form}>
          <AuthContent onAuthenticate={signupHandler} />
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    marginBottom: 10,
  },
  container: {
    backgroundColor: "red",
    flex: 1,
  },
  backImage: {
    opacity: 0.6,
  },
  imageStyle: {
    flex: 1,
    position: "relative",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
