import React from "react";
import { View, StyleSheet } from "react-native";

// props.style being second will overwrite any styles provided
const Card = (props) => {
  return (
    <View style={{ ...styles.Card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  Card: {
    shadowColor: "black",
    // These shadows settings only work on IOS
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    // Elevation is android only property for shadow effect
    elevation: 10,
    padding: 20,
    borderRadius: 5,
  },
});

export default Card;
