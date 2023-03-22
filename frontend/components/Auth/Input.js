import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

import { Colors } from "../constants/styles";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 3,
    fontSize: 16,
  },
  labelInvalid: {
    color: Colors.error500,
    fontWeight: "bold",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.InputBackgroudColor,
    borderRadius: 4,
    fontSize: 16,
    maxWidth: Platform.OS === "web" ? 500 : 400,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
