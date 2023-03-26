import { useLayoutEffect, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";

//context
import { useAppContext } from "../context/appContext";
import SingleSubject from "../components/SingleSubject";
import SingleTeacher from "../components/SingleTeacher";
import { images } from "../constants/Images/images";
import { LinearGradient } from "expo-linear-gradient";

//route will resive to any registred screens
const AllTeachersScreen = ({ route }) => {
  const navigation = useNavigation();
  //   const gradeID = route.params.singlegardeID; ////this contain gradeID 'Grade 1'
  const { Grade, subID, subjectcolor } = route.params;
  const { getAllUsersStd, usersStd } = useAppContext();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllUsersStd();
    }
  }, [isFocused]);

  const displayTeachers = usersStd.filter((user) => {
    if (user.teacherSubject === subID) {
      return { ...user, subjectcolor };
    }
  });

  const renderSubjectItem = (itemData) => {
    return (
      <SingleTeacher
        name={itemData.item.firstName}
        grade={itemData.item.Grade}
        subId={itemData.item.teacherSubject}
        id={itemData.item._id}
        color={subjectcolor}
      />
    );
  };

  return (
    <LinearGradient colors={["black", "black"]} style={styles.container}>
      <ImageBackground
        source={images.TeacherHomeBackground}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <FlatList
          data={displayTeachers}
          keyExtractor={(item) => item._id}
          renderItem={renderSubjectItem}
          numColumns={2}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

export default AllTeachersScreen;

const styles = StyleSheet.create({
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
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
