// component used to replace Text components which we want a font applied too
// avoid having to manually apply styles to each - easy to change across app
import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyText = (props) => {
  return <Text style={styles.body}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  body: { fontFamily: "open-sans" },
});

export default BodyText;
