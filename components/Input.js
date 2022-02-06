import React from "react";
import { TextInput, StyleSheet } from "react-native";
// the ...props allows us to treat this like a normal text input, with the addition of other react native settings
// as seen here (ctrl+f methods) https://reactnative.dev/docs/textinput
const Input = (props) => {
  return (
    <TextInput
      {...props}
      style={{ ...styles.Input, ...props.style }}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  Input: {
    height: 30,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
