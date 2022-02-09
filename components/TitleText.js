// component used to replace title Text components which we want a font applied too
// avoid having to manually apply styles to each - easy to change across app
import React from "react";
import { Text, StyleSheet } from "react-native";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.Title, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  Title: { fontFamily: "open-sans-bold", fontSize: 18 },
});

export default TitleText;
