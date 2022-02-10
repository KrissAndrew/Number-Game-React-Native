// component used to replace Text components which we want a font applied too
// avoid having to manually apply styles to each - easy to change across app

// Interesting note: children of this component will not inherit styles.
// Exception to this rule being  nested Text's <Text><Text></Text></Text>

// Text will also auto wrap to a new line
import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyText = (props) => {
  return (
    <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  body: { fontFamily: "open-sans" },
});

export default BodyText;
