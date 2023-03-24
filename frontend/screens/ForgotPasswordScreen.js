import { useState, useContext } from "react";
import {
  Alert,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from "react-native";
import ForgotPasswordAuthCon from "../components/Auth/ForgotPasswordAuthCon";
import { useAppContext } from "../context/appContext";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";

function ForgotPasswordScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { passwordReset, showAlert, alertType } = useAppContext();

  const resetPasswordHandler = async ({ email, password }) => {
    //try catch is used to handle data base error
    setIsAuthenticating(true);
    try {
      passwordReset({ email, newPassword: password });
      Alert.alert("Reset success", "plese re-login with new credentials", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert(
        "Authntication failed!",
        "Could not log you in. Please check credentials or try again later"
      );
      setIsAuthenticating(false);
    }
  };

  return (
    <LinearGradient colors={["black", "black"]} style={styles.container}>
      <ImageBackground
        source={images.LoginImage}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <View style={styles.form}>
          <ForgotPasswordAuthCon
            isLogin
            onAuthenticate={resetPasswordHandler}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
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
  forgetText: {
    textAlign: "center",
    paddingTop: 10,
  },
});
