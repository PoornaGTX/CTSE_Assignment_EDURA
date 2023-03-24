import { useIsFocused } from "@react-navigation/core";
import { useLayoutEffect, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import IconButton from "../components/icons/IconButton";
import MessageText from "../components/MessageText";
import TeacherNoticeGirdTitle from "../components/TeacherNoticeGridTile";
import { useAppContext } from "../context/appContext";
const ChatRoom = ({ route, navigation }) => {
  const [message, setMessage] = useState("");
  const { user, getAllMessages, messages, sendMessage } = useAppContext();
  let teacher;
  if (user.type === "student") {
    teacher = route.params.teacherFname;
  }
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Group chat",
    });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      if (user.type === "teacher") {
        getAllMessages(user.firstName);
      } else {
        getAllMessages(teacher);
      }
    }
  }, [isFocused]);

  const handleSendMessage = () => {
    if (user.type === "teacher") {
      sendMessage({
        messageSender: user.firstName,
        chatRoomOwner: user.firstName,
        message: message,
      });
    } else {
      sendMessage({
        messageSender: user.firstName,
        chatRoomOwner: teacher,
        message: message,
      });
    }
    if (user.type === "teacher") {
      getAllMessages(user.firstName);
    } else {
      getAllMessages(teacher);
    }
    setMessage("");
  };

  const renderNoticeItem = () => {
    return messages.map((message) => {
      if (message.messageSender == user.firstName) {
        message.messageSender = "You";
      }
      return (
        <MessageText
          key={message._id}
          message={message.message}
          sender={message.messageSender}
          styleProp={
            message.messageSender == "You" && {
              alignSelf: "flex-end",
            }
          }
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sendMessageSection}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Send message"
        />
        <IconButton
          icon="send"
          color="purple"
          size={36}
          onPressProp={handleSendMessage}
        />
      </View>
      <ScrollView style={styles.listContainer}>{renderNoticeItem()}</ScrollView>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column-reverse",
    padding: 24,
    backgroundColor: "#200364",
  },
  inputConainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#c6affc",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#c6affc",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: "#2d0689",
    width: "100%",
    marginRight: 4,
  },

  sendMessageSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
  },

  listContainer: {
    marginTop: 20,
  },
});
