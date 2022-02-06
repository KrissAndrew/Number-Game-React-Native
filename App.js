import { Platform, StatusBar, StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <Header title="Number Guess" />
      <StartGameScreen />
    </View>
  );
}
