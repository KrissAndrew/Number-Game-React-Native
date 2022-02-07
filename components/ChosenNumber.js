import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const ChosenNumber = (props) => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  Number: {
    color: Colors.primary,
    fontSize: 22,
  },
});

export default ChosenNumber;
