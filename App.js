import { useState } from "react";
import { Platform, StatusBar, View } from "react-native";

// expo install expo-app-loading
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  // state for loading fonts
  const [fontLoaded, setFontLoaded] = useState(false);

  // configure fonts, we set a key (ex 'open-sans') and the file path
  // keys can be used with "fontFamily: 'KEY'" in stylesheet
  // NOTE: custom fonts cannot have fontWeight altered, you need to download a seperate bold font
  const fetchFonts = async () => {
    await Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
    setFontLoaded(true);
  };

  // fonts have a slight load time (milliseconds) however it is noticable
  // use <Apploading> with state to load app once fonts have loaded
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  const playAgainHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  // userNumber !== null once user hits start game resulting in game screen
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        numRounds={guessRounds}
        playerNumber={userNumber}
        onPlayAgain={playAgainHandler}
      />
    );
  }

  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <Header title="Number Guess" />
      {content}
    </View>
  );
}
