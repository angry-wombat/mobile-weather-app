import { useState } from "react";
import { Alert, Button, SafeAreaView, Text, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import callGeocodingApi from "../api_calls/callGeocodingApi";
import callForecastApi from "../api_calls/callForecastApi";

export default function LocationSelectScreen() {
  const { navigate } = useNavigation();

  const [location, setLocation] = useState(" ");

  const locationInput = (input) => {
    setLocation(
      input
        .replace(/[^a-z]/gi, " ")
        .trim()
        .replace(/\s+/g, "+")
    );
  };

  return (
    <SafeAreaView>
      <Text>Select Location</Text>
      <TextInput
        value={Text}
        placeholder="Location"
        onChangeText={(input) => locationInput(input)}
      />
      <Button title="Go" onPress={() => go(location, navigate)} />
      <Button title="Enter API keys" onPress={() => navigate("Keys")} />
      <Button
        title="Test forecast screen"
        onPress={() =>
          navigate("Forecast", {
            location: "Canterbury",
            data: null,
          })
        }
      />
    </SafeAreaView>
  );
}

async function go(location, navigate) {
  if (location == null || location == "" || location == " ") {
    askUserForLocation();
    return;
  }

  if (!keyProvided("GEOCODE_API_KEY")) {
    () => askUserForKey("geocoding");
    return;
  }
  if (!keyProvided("FORECAST_API_KEY")) {
    () => askUserForKey("forecast");
    return;
  }

  const locationData = await callGeocodingApi(location);
  if (locationData == null) {
    Alert.alert("Geocoding error", "Could not find the specified location", [
      { text: "Ok" },
    ]);
    return;
  }

  const forecastData = await callForecastApi(locationData);
  navigate("Forecast", {
    location: locationData.display_name,
    data: forecastData,
  });
}

function askUserForLocation() {
  Alert.alert("Please enter a location", "", [{ text: "Ok" }]);
}

function askUserForKey(keyString) {
  Alert.alert("Missing " + keyString + " API key", "", [
    { text: "Cancel" },
    { text: "Enter key", onPress: () => navigate("Keys") },
  ]);
}

function keyProvided(key) {
  if (SecureStore.getItem(key) != null) {
    return true;
  }
  return false;
}
