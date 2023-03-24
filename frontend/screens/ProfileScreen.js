import { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";

//components
import ProfileForm from "../components/Form/ProfileForm";

const ProfileScreen = () => {
  const { user, alertType, alertText, showAlert } = useAppContext();
  const isFocused = useIsFocused();
  const { updateUser } = useAppContext();

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused, user]);

  if (user.length <= 0) {
    return (
      <View>
        <Text>No user data</Text>
      </View>
    );
  }

  const updateProfileHandler = (
    userMogoID,
    fname,
    lname,
    email,
    subject,
    grade,
    description
  ) => {
    updateUser(userMogoID, {
      firstName: fname,
      lastName: lname,
      email,
      teacherSubject: subject,
      teacherDescription: description,
      Grade: grade,
    });
    Alert.alert("Success!!", "Profile details updated");
  };

  if (showAlert && alertType === "danger") {
    // Alert.alert("Invalid!!", "Please check the profile values");
  }

  return (
    <LinearGradient colors={["white", "black"]} style={styles.linerContainer}>
      <ImageBackground
        source={images.profile}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <View style={styles.container}>
          <ProfileForm
            labelName1="First Name"
            labelName2="Last Name"
            labelName3="Grade"
            labelName4="Subject"
            labelName5="Email"
            labelName6="Description"
            user={user}
            updateProfileHandler={updateProfileHandler}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: "#8208E2",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#a281f0",
    alignItems: "center",
  },
  imageStyle: {
    flex: 1,
    position: "relative",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  liner: {
    flex: 1,
  },
  backImage: {
    opacity: 0.4,
  },
  linerContainer: {
    flex: 1,
  },
});
