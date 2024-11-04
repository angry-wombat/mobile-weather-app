import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationSelectScreen from "./screens/LocationSelectScreen";
import KeysScreen from "./screens/KeysScreen";
import ForecastScreen from "./screens/ForecastScreen";

const Stack = createNativeStackNavigator();

function StackGroup() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Location Select"
    >
      <Stack.Screen name="Location" component={LocationSelectScreen} />
      <Stack.Screen name="Keys" component={KeysScreen} />
      <Stack.Screen name="Forecast" component={ForecastScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackGroup />
    </NavigationContainer>
  );
}
