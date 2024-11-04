import * as SecureStore from "expo-secure-store";

export default function callGeocodingApi(location) {
  return getCoordinates(createUrl(location));
}

function createUrl(location) {
  return `https://geocode.maps.co/search?q=${location}&api_key=${SecureStore.getItem(
    "GEOCODE_API_KEY"
  )}`;
}

async function getCoordinates(url) {
  var locationData = null;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Could not find the specified location");
      }
      const data = await response.json();
      locationData = data;
    } catch (error) {
      console.error(error);
    }
  };
  await fetchData();

  return locationData[0];
}
