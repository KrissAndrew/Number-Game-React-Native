import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";

const StartGameScreen = () => {
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
    if (enteredNumber === NaN || enteredNumber <= 0 || enteredNumber > 99) {
      setConfirmed(false);
      console.log(confirmed);
      return;
    }
    setSelectedNumber(enteredNumber);
    setConfirmed(true);
    setEnteredValue("");
    console.log(enteredNumber);
    console.log(confirmed);
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = <Text>Chosen Number : {selectedNumber}</Text>;
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
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  BtnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  Btn: { width: 100 },
  Input: { width: 50, textAlign: "center" },
});

export default StartGameScreen;
