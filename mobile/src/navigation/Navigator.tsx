import { NavigationContainer } from "@react-navigation/native";
import { TabStack } from "./TabStack";

export const Navigator = () => {
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
};
