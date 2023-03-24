import { View, Text, StyleSheet } from "react-native";

const MessageText = ({ sender, message, styleProp }) => {
  return (
    <View style={[ styles.inputConainer, styleProp]}>
      <Text style={styles.label}>{sender}</Text>
      <Text style={styles.input}>{message}</Text>
    </View>
  )
}

export default MessageText

const styles = StyleSheet.create({
    inputConainer: {
      marginHorizontal: 4,
      marginVertical: 8,
      flex:1,
      flexDirection:"column",
      justifyContent:"center",
      alignItems: "flex-start"
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
    },
  });
  