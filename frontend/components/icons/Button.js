import { View, Pressable, Text, StyleSheet } from "react-native";

const Button = ({ children, onPressProp, mode, style, color, fontSize }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPressProp}
        style={({ pressed }) => pressed && styles.preased}
      >
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            color && { backgroundColor: color },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              fontSize && { fontSize: fontSize },
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#9095c",
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  flatText: {
    color: "#a281f0",
  },
  preased: {
    opacity: 0.75,
    backgroundColor: "#09b88e",
    borderRadius: 4,
  },
});
