import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ManageButton from "./icons/ManageButton";

const GradeGirdTitle = ({ grade, color, gradeID, onPressProp }) => {
  const user = "Admin"; //tempory
  const navigation = useNavigation();

  //for manage button
  const MangeButtonHanlder = () => {
    navigation.navigate("ManageGrade", {
      GradeNumberID: grade,
      GradeID: gradeID,
    });
  };

  return (
    <View style={[styles.gridItem, user === "Admin" && styles.gridItemupdate]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null, //this for ios
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPressProp}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{grade}</Text>
        </View>
      </Pressable>
      {user === "Admin" && (
        <ManageButton onPressProp={MangeButtonHanlder}>Manage</ManageButton>
      )}
    </View>
  );
};

export default GradeGirdTitle;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  gridItemupdate: {
    height: 200,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
});
