import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.Screen}>
      <Text>The Game is Over</Text>
      <Text>Number of rounds {props.numRounds}</Text>
      <Text>Number was: {props.playerNumber}</Text>
      <Button title="Play Again" onPress={props.onPlayAgain}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
