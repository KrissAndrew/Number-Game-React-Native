import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "../components/Card";
import ChosenNumber from "../components/ChosenNumber";
import Input from "../components/Input";
import Colors from "../constants/Colors";

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
        <Button
          color={Colors.accent}
          onPress={() => props.onStartGame(selectedNumber)}
          title="Start Game"
        ></Button>
      </Card>
    );
  }

  // wrapping area in Touchable... allows us to attach a function with the Keyboard API to close the keyboard
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.Screen}>
        <Text style={styles.Title}>Start a New Game!</Text>

        <Card style={styles.InputContainer}>
          <Text>Select a Number</Text>
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
    fontFamily: "open-sans-bold",
  },
  InputContainer: {
    width: 300,
    maxWidth: "80%",
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
    width: 90,
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
