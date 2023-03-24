import { useLayoutEffect, useEffect } from "react";
import { FlatList, ImageBackground, StyleSheet,   Dimensions,} from "react-native";
import IconButton from "../components/icons/IconButton";
import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import TeacherNoticeGirdTitle from "../components/TeacherNoticeGridTile";
import { images } from "../constants/Images/images";
import { LinearGradient } from "expo-linear-gradient";

const TeacherAllNotices = ({ navigation }) => {
  const { teacherGetAllNotices, teacherAllNotices, logOutUser, user } =
    useAppContext();
  const isFocused = useIsFocused();

  const renderNoticeItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate("AddNotice", {
        NoticeID: itemData.item._id,
      });
    };

    return (
      <TeacherNoticeGirdTitle
        grade={itemData.item.title}
        color={itemData.item.color}
        _id={itemData.item._id}
        onPressProp={pressHandler}
      />
    );
  };

  const headerButtonHandler = () => {
    navigation.navigate("AddNotice");
  };

  useEffect(() => {
    if (isFocused) {
      teacherGetAllNotices();
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="add"
            color="black"
            size={24}
            onPressProp={headerButtonHandler}
          />
        );
      },
      headerLeft: () => {
        return (
          <IconButton icon="exit" size={24} onPressProp={() => logOutUser()} />
        );
      },
    });
  }, []);

  return (
    <LinearGradient colors={["white", "white"]} style={styles.container}>
      <ImageBackground
        source={images.TeacherHomeBackground}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <FlatList
          data={teacherAllNotices}
          keyExtractor={(item) => item._id}
          renderItem={renderNoticeItem}
          numColumns={2}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

export default TeacherAllNotices;

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
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
