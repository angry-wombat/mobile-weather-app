import * as SecureStore from "expo-secure-store";

export default async function callForecastApi(locationData) {
  var forecastData = [];
  const baseUrl =
    "https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/";

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}hourly?excludeParameterMetadata=false&latitude=${locationData.lat}&longitude=${locationData.lon}`,
        {
          headers: { apikey: SecureStore.getItem("FORECAST_API_KEY") },
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Could not retrieve forecast data");
      }
      const data = await response.json();
      forecastData[i] = data;
    } catch (error) {
      console.error(error);
    }
  };
  await fetchData();

  return forecastData;
}
