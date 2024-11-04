import { useState } from "react";
import { Button, SafeAreaView, Text, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function KeysScreen() {
  const [geocodeKey, setGeocodeKey] = useState(" ");
  const [forecastKey, setForecastKey] = useState(" ");

  const geocodeKeyInput = (input) => {
    setGeocodeKey(input);
  };

  const forecastKeyInput = (input) => {
    setForecastKey(input);
  };

  const storeKeys = () => {
    if (geocodeKey != null && geocodeKey != "" && geocodeKey != " ") {
      SecureStore.setItem("GEOCODE_API_KEY", geocodeKey);
    }
    if (forecastKey != null && forecastKey != "" && forecastKey != " ") {
      SecureStore.setItem("FORECAST_API_KEY", forecastKey);
    }
  };

  // geocoding website "geocode.maps.co"
  // forecast website "datahub.metoffice.gov.uk"
  return (
    <SafeAreaView>
      <TextInput
        value={Text}
        placeholder="Geocode API key"
        onChangeText={(input) => geocodeKeyInput(input)}
      />

      <TextInput
        value={Text}
        placeholder="Site Specific Forecast API key"
        onChangeText={(input) => forecastKeyInput(input)}
      />

      <Button title="Save" onPress={() => storeKeys()} />
    </SafeAreaView>
  );
}
