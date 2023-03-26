import { useLayoutEffect, useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";
import TimeTable from "@mikezzb/react-native-timetable";

//context
import { useAppContext } from "../context/appContext";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants/Images/images";

//route will resive to any registred screens
const StudentTimeTableScreen = ({ route }) => {
  const navigation = useNavigation();
  //   const gradeID = route.params.singlegardeID; ////this contain gradeID 'Grade 1'

  const { studentNotices, getAllNoticesStd } = useAppContext();

  const isFocused = useIsFocused();
  const getDateValue = (date) => {
    if (date === "Monday") {
      return 1;
    } else if (date === "Tuesday") {
      return 2;
    } else if (date === "Wednesday") {
      return 3;
    } else if (date === "Thursday") {
      return 4;
    } else if (date === "Friday") {
      return 5;
    } else if (date === "Saturday") {
      return 6;
    } else {
      return 7;
    }
  };

  const getEndTime = (startTime) => {
    let getHour = Number(startTime.split(":")[0]);
    getHour = getHour + 2;
    return `${getHour}:${Number(startTime.split(":")[1])}`;
  };
  const events = studentNotices.map((notice) => {
    return {
      courseId: notice.title,
      location: `${notice.description}\n ${notice.link}`,
      day: getDateValue(notice.date.split("-")[0]),
      startTime: notice.date.split("-")[1],
      endTime: getEndTime(notice.date.split("-")[1]),
    };
  });
  useEffect(() => {
    if (isFocused) {
      getAllNoticesStd();
      // console.log(studentNotices);
    }
  }, [isFocused]);

  return (
    <TimeTable
      events={events}
      eventOnPress={(event) =>
        Alert.alert(`${event.courseId}`, `${event.location}`)
      }
    />
  );
};

export default StudentTimeTableScreen;

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
