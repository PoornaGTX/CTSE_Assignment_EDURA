import { View, Pressable, Text, StyleSheet } from "react-native";

const TeacherEditButton = ({ children, onPressProp, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPressProp}
        style={({ pressed }) => pressed && styles.preased}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default TeacherEditButton

const styles = StyleSheet.create({
    button: {
      borderBottomEndRadius: 4,
      borderBottomRightRadius: 4,
      padding: 8,
      backgroundColor: "black",
      height: 45,
      justifyContent: "center",
      margin: 2,
      minWidth: 60
    },
    buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 12
    },
    preased: {
      opacity: 0.75,
      backgroundColor: "black",
      borderRadius: 4,
    },
  });