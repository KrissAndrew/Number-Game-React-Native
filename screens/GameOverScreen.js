import React from "react";
import { View, StyleSheet, Button, Image } from "react-native";

import Colors from "../constants/Colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

// use of image component here
// local images must be loaded with require()
// allows react native to load and determine width and height

// resizeMode setting in image allows us to apply usual css settings
// cover - crops to fit container
// contain - maintains image aspect ratio regardless of container

const GameOverScreen = (props) => {
  return (
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
      <BodyText>Number of rounds {props.numRounds}</BodyText>
      <BodyText>Number was: {props.playerNumber}</BodyText>
      <View style={styles.BtnContainer}>
        <Button
          color={Colors.accent}
          title="Play Again"
          onPress={props.onPlayAgain}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: { width: "100%", height: "100%" },
  BtnContainer: {
    marginTop: 10,
  },
});

export default GameOverScreen;
