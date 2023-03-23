import { useLayoutEffect, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

import GradeGirdTitle from "../components/GradeGirdTitle";
import IconButton from "../components/icons/IconButton";

import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";

import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";

const GradesScreen = ({ navigation }) => {
  const { getAllGrades, grades } = useAppContext();
  const isFocused = useIsFocused();

  const renderGradesItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate("Subjects", { singlegardeID: itemData.item.Grade });
    };

    return (
      <GradeGirdTitle
        grade={itemData.item.Grade}
        color={itemData.item.color}
        gradeID={itemData.item._id}
        onPressProp={pressHandler}
      />
    );
  };

  const headerButtonHandler = () => {
    navigation.navigate("ManageGrade");
  };

  useEffect(() => {
    if (isFocused) {
      getAllGrades();
    }
  }, [isFocused]);

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

  return (
    <LinearGradient colors={["white", "white"]} style={styles.container}>
      <ImageBackground
        source={images.HomeImage}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <FlatList
          data={grades}
          keyExtractor={(item) => item._id}
          renderItem={renderGradesItem}
          numColumns={2}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

export default GradesScreen;

const styles = StyleSheet.create({
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
