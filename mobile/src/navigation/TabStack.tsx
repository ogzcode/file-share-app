import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home as HomeScreen } from "../screens/Home";
import { Home } from "lucide-react-native";

export const TabStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Home color="red" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};
