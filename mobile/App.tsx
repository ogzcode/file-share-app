import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import { Navigator } from "./src/navigation/Navigator";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <Navigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

