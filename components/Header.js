import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    textAlign: "center",
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 30,
  },
});
