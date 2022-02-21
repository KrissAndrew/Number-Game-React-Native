import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, Dimensions } from "react-native";

// icons import - https://icons.expo.fyi/AntDesign/up
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Card from "../components/Card";
import ChosenNumber from "../components/ChosenNumber";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

// exclude - players number to avoid instant game over
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  // if (random guess === players guess) run again
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// function to display guesses - keep JSX leaner
const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  // generate a random guess and store
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // track number of rounds taken for game over screen
  const [passedRounds, setPassedRounds] = useState([initialGuess]);

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
      onGameOver(passedRounds.length);
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
    // if user indicated guess is lower, we set the current highest guess to the current number - as logically the current guess is the highest so far
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    }
    // if user indicates guess is high, current guess must be new lowest
    else {
      currentLow.current = currentGuess + 1;
    }
    // generate new guess accounting for updated upper/lower bound
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    // change guess to new random & update rounds
    setCurrentGuess(nextNumber);
    // setRound((curRound) => curRound + 1);
    setPassedRounds((curPassedRounds) => [nextNumber, ...curPassedRounds]);
  };

  return (
    <View style={styles.Screen}>
      <TitleText>Computer's Guess</TitleText>
      <ChosenNumber>{currentGuess}</ChosenNumber>
      <Card style={styles.BtnContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <AntDesign name="down" size={24} />
        </MainButton>
        <MainButton
          style={styles.higher}
          onPress={nextGuessHandler.bind(this, "higher")}
        >
          <AntDesign name="up" size={24} />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {passedRounds.map((guess, index) =>
            renderListItem(guess, passedRounds.length - index)
          )}
        </ScrollView>
      </View>
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
    // alternative device sizing using dimensions
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 400,
    maxWidth: "72%",
  },
  higher: { backgroundColor: Colors.primary },
  listContainer: {
    //flex 1 required for scroll to work on android
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "80%" : "100%",
  },
  // flex grow makes list start at the bottom and stack up
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default GameScreen;
