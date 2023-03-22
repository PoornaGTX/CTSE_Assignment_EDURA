import { useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { useAppContext } from "../context/appContext";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { loginUser, showAlert, alertType, alertText } = useAppContext();

  const loginHandler = async ({ email, password }) => {
    //try catch is used to handle data base error
    setIsAuthenticating(true);
    try {
      loginUser({ email, password });
    } catch (error) {
      Alert.alert(
        "Authntication failed!",
        "Could not log you in. Please check credentials or try again later"
      );
      setIsAuthenticating(false);
    }
  };

  const alertHandler = () => {
    setIsAuthenticating(false);
    navigation.navigate("Login");
  };

  if (showAlert && alertType === "danger") {
    Alert.alert(
      "Authntication failed!",
      `Could not log you in. Please check credentials or try again later ${alertText}`,
      [{ text: "Okay", onPress: alertHandler }]
    );
  }

  return (
    <LinearGradient colors={["black", "black"]} style={styles.container}>
      <ImageBackground
        source={images.LoginImage}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <View style={styles.form}>
          <AuthContent isLogin onAuthenticate={loginHandler} />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  form: {
    marginTop: 100,
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
