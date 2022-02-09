// alterntative to creating components for easier restyling across the app

// I think I prefer creating components

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bodyText: {
    fontFamily: "open-sans",
    color: "red",
  },
  title: { fontFamily: "open-sans-bold", fontSize: 18 },
});

// import DefaultStyles from '../whereever'
// <Text style={DefaultStyles.title}>Title</Text>
// <Text style={DefaultStyles.bodyText}>Body Text</Text>
