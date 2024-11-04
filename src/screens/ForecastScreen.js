import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import Table from "../components/Table";

export default function ForecastScreen({ route }) {
  const { location, data } = route.params;

  const columns = React.useMemo(
    () => createColumns(data[0].features[0].properties.timeSeries),
    []
  );

  const tableData = React.useMemo(
    () => formatData(data[0].features[0].properties.timeSeries),
    []
  );

  return (
    <SafeAreaView>
      <Text>{location}</Text>
      <Table columns={columns} data={tableData} />
    </SafeAreaView>
  );
}

function createColumns(data) {
  var days = [];
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var columns = [];

  for (let step of data) {
    let day = new Date(step.time).getUTCDay();
    if (!days.includes(day)) {
      days[days.length] = day;
      columns[columns.length] = {
        Header: weekday[day],
        columns: createSubColumns(data, day),
      };
    }
  }

  return columns;
}

function createSubColumns(data, day) {
  var subColumns = [];
  for (let step of data) {
    let date = new Date(step.time);
    if (date.getUTCDay() == day) {
      if (date.getUTCHours() < 10) {
        subColumns[subColumns.length] = {
          Header: "0" + date.getUTCHours() + ":00",
          accessor: step.time,
        };
      } else {
        subColumns[subColumns.length] = {
          Header: date.getUTCHours() + ":00",
          accessor: step.time,
        };
      }
    }
  }

  return subColumns;
}

function formatData(data) {
  const significantWeatherCode = {};
  const probOfPrecipitation = {};
  const screenTemperature = {};
  const feelsLikeTemperature = {};

  data.forEach((entry) => {
    const time = entry.time;

    significantWeatherCode[time] = replaceWithImage(
      entry.significantWeatherCode
    );
    probOfPrecipitation[time] = entry.probOfPrecipitation + "%";
    screenTemperature[time] = entry.screenTemperature + "°";
    feelsLikeTemperature[time] = entry.feelsLikeTemperature + "°";
  });

  const result = [
    significantWeatherCode,
    probOfPrecipitation,
    screenTemperature,
    feelsLikeTemperature,
  ];

  return result;
}

function replaceWithImage(code) {
  const imageUrl =
    "https://www.metoffice.gov.uk/weather/forecast/static/images/forecasts/weather/";

  return (
    <Image
      source={`${imageUrl}${getWeatherType(code)[0]}.svg`}
      style={{ width: 50, height: 50 }}
      placeholder={getWeatherType(code)[1]}
    />
  );
}

function getWeatherType(code) {
  switch (code) {
    case -1:
      return [31, "Trace rain"];
    case 0:
      return [0, "Clear night"];
    case 1:
      return [1, "Sunny day"];
    case 2:
      return [2, "Partly cloudy (night)"];
    case 3:
      return [3, "Partly cloudy (day)"];
    case 5:
      return [5, "Mist"];
    case 6:
      return [6, "Fog"];
    case 7:
      return [7, "Cloudy"];
    case 8:
      return [8, "Overcast"];
    case 9:
      return [9, "Light rain shower (night)"];
    case 10:
      return [10, "Light rain shower (day)"];
    case 11:
      return [11, "Drizzle"];
    case 12:
      return [12, "Light rain"];
    case 13:
      return [13, "Heavy rain shower (night)"];
    case 14:
      return [14, "Heavy rain shower (day)"];
    case 15:
      return [15, "Heavy rain"];
    case 16:
      return [16, "Sleet shower (night)"];
    case 17:
      return [17, "Sleet shower (day)"];
    case 18:
      return [18, "Sleet"];
    case 19:
      return [19, "Hail shower (night)"];
    case 20:
      return [20, "Hail shower (day)"];
    case 21:
      return [21, "Hail"];
    case 22:
      return [22, "Light snow shower (night)"];
    case 23:
      return [23, "Light snow shower (day)"];
    case 24:
      return [24, "Light snow"];
    case 25:
      return [25, "Heavy snow shower (night)"];
    case 26:
      return [26, "Heavy snow shower (day)"];
    case 27:
      return [27, "Heavy snow"];
    case 28:
      return [28, "Thunder shower (night)"];
    case 29:
      return [29, "Thunder shower (day)"];
    case 30:
      return [30, "Thunder"];
    default:
      return [-1, "Not available"];
  }
}
