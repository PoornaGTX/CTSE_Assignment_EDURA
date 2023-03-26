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

//components
import IconButton from "../components/icons/IconButton";

//context
import { useAppContext } from "../context/appContext";
import StudentNotice from "../components/StudentNotice";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";

//route will resive to any registred screens
const StudentNoticesScreen = ({ route }) => {
  // const navigation = useNavigation();
  //   const gradeID = route.params.singlegardeID; ////this contain gradeID 'Grade 1'

  const { getAllSubjects, subjects, getAllNoticesStd, studentNotices } =
    useAppContext();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllNoticesStd();
    }
  }, [isFocused]);

  const renderNoticeItem = (itemData) => {
    return (
      <View style={styles.singleNotice}>
        <StudentNotice
          labelName2={itemData.item.title}
          titleProp={itemData.item.title}
          descriptionProp={itemData.item.description}
          linkProp={itemData.item.link}
          dateProp={itemData.item.date}
        />
      </View>
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
        <View style={styles.root}>
          <FlatList
            data={studentNotices}
            keyExtractor={(item) => item._id}
            renderItem={renderNoticeItem}
            style={{ backgroundColor: "transparent" }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default StudentNoticesScreen;

const styles = StyleSheet.create({
  root: {
    padding: 15,
  },
  singleNotice: {
    backgroundColor: "#432C7A",
    marginBottom: 10,
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
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
