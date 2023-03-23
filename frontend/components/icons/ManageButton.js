import { View, Pressable, Text, StyleSheet } from "react-native";

const ManageButton = ({ children, onPressProp, style }) => {
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
  );
};

export default ManageButton;

const styles = StyleSheet.create({
  button: {
    borderBottomEndRadius: 4,
    borderBottomRightRadius: 4,
    padding: 8,
    backgroundColor: "#09b88e",
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  preased: {
    opacity: 0.75,
    backgroundColor: "black",
    borderRadius: 4,
  },
});
