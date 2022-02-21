import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";

import Card from "../components/Card";
import ChosenNumber from "../components/ChosenNumber";
import Input from "../components/Input";

import Colors from "../constants/Colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");

  const numberInputHandler = (inputText) => {
    // replace anything that is not 0 or 9 as an empty string
    // this will constantly remove any invalid '.' or ',' inputs
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmHandler = () => {
    const enteredNumber = parseInt(enteredValue);
    if (isNaN(enteredNumber) || enteredNumber <= 0 || enteredNumber > 99) {
      Alert.alert("Invalid Number!", "Number must be between 1 & 99.", [
        { text: "Okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }
    setSelectedNumber(enteredNumber);
    setConfirmed(true);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  // card holding items to confirm number and start game
  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.StartContainer}>
        <Text>Chosen Number</Text>
        <ChosenNumber>{selectedNumber}</ChosenNumber>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          Start Game
        </MainButton>
      </Card>
    );
  }

  // wrapping area in Touchable... allows us to attach a function with the Keyboard API to close the keyboard - similar to closing a modal
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.Screen}>
        <TitleText style={styles.Title}>Start a New Game!</TitleText>

        <Card style={styles.InputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.Input}
            keyboardType="number-pad"
            blurOnSubmit={true}
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
            onSubmitEditing={confirmHandler}
          />

          <View style={styles.BtnContainer}>
            <View style={styles.Btn}>
              <Button
                color={Colors.primary}
                onPress={confirmHandler}
                title="Confirm"
              ></Button>
            </View>
            <View style={styles.Btn}>
              <Button
                color={Colors.accent}
                onPress={resetHandler}
                title="Reset"
              ></Button>
            </View>
          </View>
        </Card>

        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  Title: {
    fontSize: 20,
    marginVertical: 10,
  },
  InputContainer: {
    // screen resizing - will take 80% of screen due to width
    // however minimum is 300 pixel wide
    // if device is tiny < 300 px max width 95% avoids screen cutoff
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
    padding: 20,
  },
  BtnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },
  Btn: {
    // using dimensions dictates button size from window width
    width: Dimensions.get("window").width / 3.5,
  },
  Input: {
    width: 50,
    textAlign: "center",
  },
  StartContainer: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },
});

export default StartGameScreen;
