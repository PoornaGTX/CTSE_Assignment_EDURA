import React, { Component } from "react";
import { useLayoutEffect, useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";

import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import LoadingOverLay from "../components/LoadingOverLay/LoadingOverLay";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";
// import { user } from "../App";

const SelectedTeacherScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { teacherID, name, grade, subId } = route.params;
  const {
    user,
    subscribeHandler,
    mySubscribeList,
    isLoading,
    alertText,
    usersStd,
    getAllUsersStd,
  } = useAppContext();

  useEffect(() => {
    if (isFocused) {
      //   getAllSubjects();
      getAllUsersStd();
    }
  }, [isFocused]);

  const isSubscribe = mySubscribeList.includes(teacherID);
  const teacher = usersStd.find((user) => user._id === teacherID);
  const ButtonHandlerChat = () => {
    navigation.navigate("ChatRoom", {
      teacherFname: teacher.firstName,
    });
  };
  const subUnsubHandler = async () => {
    const subData = { subId: teacherID, isSubscribe: isSubscribe };
    subscribeHandler(subData);
    return Alert.alert(
      alertText,
      isSubscribe ? "Unsubscribe the teacher." : "Subscribe the teacher."
    );
  };
  if (isLoading) {
    return <LoadingOverLay />;
  }
  return (
    <LinearGradient colors={["black", "black"]} style={styles.ImageContainer}>
      <ImageBackground
        source={images.TeacherHomeBackground}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <ScrollView style={styles.form}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
                  }}
                />

                <View>
                  <Text style={styles.name}>{teacher.firstName}</Text>
                  <Text style={styles.userInfo}>{teacher.email}</Text>
                  <View>
                    <Button
                      title={isSubscribe ? "unsubscribe" : "Subscribe"}
                      onPress={subUnsubHandler}
                      style={styles.button}
                    ></Button>
                    {isSubscribe && (
                      <View style={styles.chatButton}>
                        <Button
                          title={"chat"}
                          onPress={ButtonHandlerChat}
                          style={styles.button}
                        ></Button>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.body}>
              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image
                    style={styles.icon}
                    source={{
                      uri: "https://img.icons8.com/color/70/000000/administrator-male.png",
                    }}
                  />
                </View>
                <View style={styles.infoContent}>
                  <Text
                    style={styles.info}
                  >{`Hey I'm ${teacher.firstName} ${teacher.lastName}`}</Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image
                    style={styles.icon}
                    source={{
                      uri: "https://img.icons8.com/color/70/000000/university.png",
                    }}
                  />
                </View>
                <View style={styles.infoContent}>
                  <Text
                    style={styles.info}
                  >{`I'm ${teacher.teacherSubject} ${teacher.type}`}</Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image
                    style={styles.icon}
                    source={{
                      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABH0lEQVRIie3Uvy5EQRTH8c+qVAqyohGFXuEJFB7AA3gCjUqr9BqUCpVWwWroRLOJjkhk/UuIkGDtVeyKm5u9f2Z2V+WXTObfmfOdM2dyasp1jtkSmxUcV/CVq0UkFdoN5gYB7VcEJWhiMgYyj04AKMEBxkJB64GQn7YZCtqJBLWxFAJqRIISnGSdFb3nRMitMloIAY0PADoKMT4V92xnmMo6K4roIeRWPR3qfoTHENBdBGgNz/02ikCNCNBTxBl1vAnLz0yes6KI7nWrQwt7qfV2anyLr9Q8qRhEobZwgWVs4BqruPQb0fQwQHlqpkD1PKPgSluizl+BcnP0D+qnWmr8OUpQWu28jWGAXnv9Oz5GCWr1+isjztEuXrBdZPQNeMyRQY0CIxoAAAAASUVORK5CYII=",
                    }}
                  />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>More about Me</Text>
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}></View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>{teacher.teacherDescription}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default SelectedTeacherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#a281f0",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  chatButton: {
    marginTop: 10,
  },
  header: {
    backgroundColor: "#624F82",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerContent: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  userInfo: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    marginBottom: 10,
  },
  body: {
    backgroundColor: "#3F3B6C",
    paddingBottom: 20,
    paddingRight: 20,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 4,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },

  form: {
    marginTop: 10,
  },
  ImageContainer: {
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
