import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

