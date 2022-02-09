import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import Colors from "../constants/Colors";

import Card from "../components/Card";
import ChosenNumber from "../components/ChosenNumber";

// exclude - players number to avoid instant game over
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  // if the random guess === players number run again
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  // generate a random guess and store
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  // state to track number of rounds taken for game over screen
  const [round, setRound] = useState(0);

  // useRef can be used to store a number between rerender cycles
  // here we use it to hold the low and high bounds
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // use array destructuring for useEffect
  const { userChoice, onGameOver } = props;

  // whenever the app re renders will check the win condition
  // if met game over screen will replace screen content
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(round);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    // logic to catch out dishonest hints from user
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", `Your number was ${props.userChoice}...`, [
        { text: "My bad!", style: "cancel" },
      ]);
      return;
    }
    // logic for correct hint provided
    // if user indicated guess is lower, we set the current highest guess to the current number - as logically the current guess is the highest so far
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    }
    // if user indicates guess is high, current guess must be new lowest
    else {
      currentLow.current = currentGuess;
    }
    // generate new guess accounting for updated upper/lower bound
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    // change guess to new random & update rounds
    setCurrentGuess(nextNumber);
    setRound((curRound) => curRound + 1);
  };

  return (
    <View style={styles.Screen}>
      <Text>Computer's Guess</Text>
      <ChosenNumber>{currentGuess}</ChosenNumber>
      <Card style={styles.BtnContainer}>
        <Button
          color={Colors.accent}
          title="Lower"
          onPress={nextGuessHandler.bind(this, "lower")}
        ></Button>
        <Button
          color={Colors.primary}
          title="Higher"
          onPress={nextGuessHandler.bind(this, "higher")}
        ></Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  BtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
