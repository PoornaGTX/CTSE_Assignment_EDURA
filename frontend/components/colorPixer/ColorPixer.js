import { View, Pressable, StyleSheet } from "react-native";

const ColorPixer = ({ subjectColor, onPressProp }) => {
  return (
    <Pressable
      onPress={() => onPressProp(subjectColor)}
      android_ripple={{ color: "#ccc" }}
    >
      <View
        style={[styles.colorView, { backgroundColor: subjectColor }]}
      ></View>
    </Pressable>
  );
};

export default ColorPixer;

const styles = StyleSheet.create({
  colorView: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
});
