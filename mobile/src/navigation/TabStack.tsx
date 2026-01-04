import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Home as HomeScreen } from "../screens/Home";
import { ShareScreen } from "../screens/Share";
import { Home, Share2Icon } from "lucide-react-native";

export const TabStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#4B5563"
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View
              className={`${focused ? "bg-amber-100 rounded-full p-2" : ""}`}
            >
              <Home color="#d97706" size={18} />
            </View>
          ),
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 10, color: "#d97706" },
        }}
      />
      <Tab.Screen
        name="Share"
        component={ShareScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View
              className={`${focused ? "bg-amber-100 rounded-full p-2" : ""}`}
            >
              <Share2Icon color="#d97706" size={18} />
            </View>
          ),
          tabBarLabel: "Share",
          tabBarLabelStyle: { fontSize: 10, color: "#d97706" },
        }}
      />
    </Tab.Navigator>
  );
};
