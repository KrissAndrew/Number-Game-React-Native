import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";

import Colors from "../constants/Colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

// use of image component here
// local images must be loaded with require()
// allows react native to load and determine width and height

// resizeMode setting in image allows us to apply usual css settings
// cover - crops to fit container
// contain - maintains image aspect ratio regardless of container

const GameOverScreen = (props) => {
  // add s to 'round' if rounds > 1
  let plural = " ";

  if (props.numRounds > 1) {
    plural = "s ";
  }

  return (
    <ScrollView>
      <View style={styles.Screen}>
        <TitleText>The Game is Over</TitleText>
        <View style={styles.imageContainer}>
          <Image
            // ? local image
            source={require("../assets/success.png")}
            // ? online image
            // source={{
            //   uri: "https://cf.ltkcdn.net/dogs/images/orig/236742-1600x1030-cutest-puppy-videos.jpg",
            // }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed
            <Text style={styles.highlight}> {props.numRounds}</Text> round
            {plural}
            to guess number
            <Text style={styles.highlight}> {props.playerNumber}</Text>
          </BodyText>
        </View>
        <View style={styles.BtnContainer}>
          <MainButton onPress={props.onPlayAgain}>Play Again</MainButton>
        </View>
      </View>
    </ScrollView>
  );
};

// if in doubt "console.log(Dimensions.get("screen").height);"
const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height > 600 ? 50 : 5,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  BtnContainer: {
    marginTop: 10,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 70,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height > 600 ? 20 : 14,
  },
  highlight: {
    color: Colors.accent,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
