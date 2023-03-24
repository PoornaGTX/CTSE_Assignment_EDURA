import { useLayoutEffect, useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";
import { images } from "../constants/Images/images";

//components
import SubjectGirdTitle from "../components/SubjectGirdTitle";
import IconButton from "../components/icons/IconButton";
import { KnowledgelabContext } from "../store/KLab-context";

//LoadingOverlay
import LoadingOverLay from "../components/LoadingOverLay/LoadingOverLay";

//context
import { useAppContext } from "../context/appContext";

import SingleSubject from "../components/SingleSubject";
import { LinearGradient } from "expo-linear-gradient";

//route will resive to any registred screens
const MySubjects = ({ route }) => {
  const { user, getAllSubjects, subjects } = useAppContext();
  // let subjects = [];
  const navigation = useNavigation();
  //   const gradeID = route.params.singlegardeID; ////this contain gradeID 'Grade 1'

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllSubjects();
    }
  }, [isFocused]);

  const displaySubjects = subjects.filter((singleSubject) => {
    return singleSubject.gID === user.Grade;
  });

  //for header button for adding new subject
  const headerButtonHandler = () => {
    navigation.navigate("ManageSubjects", { gradeNameID: gradeID });
  };

  const renderSubjectItem = (itemData) => {
    return (
      <SingleSubject
        subjectName={itemData.item.subjectName}
        subjectcolor={itemData.item.color}
        subjectID={itemData.item.subjectName}
        Grade={user.Grade}
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
          data={displaySubjects}
          keyExtractor={(item) => item._id}
          renderItem={renderSubjectItem}
          numColumns={2}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

export default MySubjects;

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
