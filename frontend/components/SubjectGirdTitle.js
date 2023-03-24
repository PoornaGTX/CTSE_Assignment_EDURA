import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ManageButton from "./icons/ManageButton";

const SubjectGirdTitle = ({ subjectName, subjectID, subjectcolor, Grade }) => {
  const user = "Admin"; //tempory
  const navigation = useNavigation();

  const headerButtonHandlerSubject = () => {
    navigation.navigate("ManageSubjects", { subID: subjectID, Grade: Grade });
  };

  return (
    <View style={[styles.gridItem, user === "Admin" && styles.gridItemupdate]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null, //this for ios
        ]}
        android_ripple={{ color: "#ccc" }}
        // onPress={} this onPress is for view teachers
      >
        <View
          style={[
            styles.innerContainer,
            { backgroundColor: subjectcolor },
            user === "Admin" && styles.innerContainerUpdateAdmin,
          ]}
        >
          <Text style={styles.title}>{subjectName}</Text>
        </View>
      </Pressable>
      {user === "Admin" && (
        <ManageButton onPressProp={headerButtonHandlerSubject}>
          Manage
        </ManageButton>
      )}
    </View>
  );
};

export default SubjectGirdTitle;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
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
    borderRadius: 8,
  },
  innerContainerUpdateAdmin: {
    borderRadius: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
