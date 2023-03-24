import { useLayoutEffect, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";

//components
import SubjectGirdTitle from "../components/SubjectGirdTitle";
import IconButton from "../components/icons/IconButton";

//context
import { useAppContext } from "../context/appContext";

//route will resive to any registred screens
const GradeSubjects = ({ route }) => {
  const navigation = useNavigation();
  const gradeID = route.params.singlegardeID; ////this contain gradeID 'Grade 1'

  const { getAllSubjects, subjects, user } = useAppContext();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllSubjects();
    }
  }, [isFocused]);

  const displaySubjects = subjects.filter((singleSubject) => {
    return singleSubject.gID === gradeID;
  });

  //for header button for adding new subject
  const headerButtonHandler = () => {
    navigation.navigate("ManageSubjects", { gradeNameID: gradeID });
  };

  const renderSubjectItem = (itemData) => {
    return (
      <SubjectGirdTitle
        subjectName={itemData.item.subjectName}
        subjectcolor={itemData.item.color}
        subjectID={itemData.item._id}
        Grade={gradeID}
      />
    );
  };

  //header Button

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="add"
            color="white"
            size={30}
            onPressProp={headerButtonHandler}
          />
        );
      },
    });
  }, []);

  //get all subjects

  if (displaySubjects.length === 0) {
    return <Text style={styles.infoText}>No subjects availble</Text>;
  }

  return (
    <LinearGradient colors={["white", "white"]} style={styles.container}>
      <ImageBackground
        source={images.subject}
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

export default GradeSubjects;

const styles = StyleSheet.create({
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
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
