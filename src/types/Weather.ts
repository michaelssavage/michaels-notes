export interface IWeather {
  location: {
    name: "Barcelona";
    region: "Catalonia";
    country: "Spain";
    lat: 41.3833;
    lon: 2.1833;
    tz_id: "Europe/Madrid";
  };
  current: {
    temp_c: number;
    is_day: number;
    condition: {
      text: WeatherCondition;
      code: keyof typeof WeatherIcon;
    };
  };
}

export const WeatherIcon = {
  1000: 113,
  1003: 116,
  1006: 119,
  1009: 122,
  1030: 143,
  1063: 176,
  1066: 179,
  1069: 182,
  1072: 185,
  1087: 200,
  1114: 227,
  1117: 230,
  1135: 248,
  1147: 260,
  1150: 263,
  1153: 266,
  1168: 281,
  1171: 284,
  1180: 293,
  1183: 296,
  1186: 299,
  1189: 302,
  1192: 305,
  1195: 308,
  1198: 311,
  1201: 314,
  1204: 317,
  1207: 320,
  1210: 323,
  1213: 326,
  1216: 329,
  1219: 329,
  1222: 314,
  1225: 314,
  1237: 230,
  1240: 143,
  1243: 296,
  1246: 308,
  1249: 317,
  1252: 323,
  1255: 263,
  1258: 311,
  1261: 284,
  1264: 317,
  1273: 386,
  1276: 389,
  1279: 392,
  1282: 323,
};

export type WeatherCondition =
  | "Sunny"
  | "Clear"
  | "Partly cloudy"
  | "Partly cloudy"
  | "Cloudy"
  | "Cloudy"
  | "Overcast"
  | "Overcast"
  | "Mist"
  | "Mist"
  | "Patchy rain possible"
  | "Patchy rain possible"
  | "Patchy snow possible"
  | "Patchy snow possible"
  | "Patchy sleet possible"
  | "Patchy sleet possible"
  | "Patchy freezing drizzle possible"
  | "Patchy freezing drizzle possible"
  | "Thundery outbreaks possible"
  | "Thundery outbreaks possible"
  | "Blowing snow"
  | "Blowing snow"
  | "Blizzard"
  | "Blizzard"
  | "Fog"
  | "Fog"
  | "Freezing fog"
  | "Freezing fog"
  | "Patchy light drizzle"
  | "Patchy light drizzle"
  | "Light drizzle"
  | "Light drizzle"
  | "Freezing drizzle"
  | "Freezing drizzle"
  | "Heavy freezing drizzle"
  | "Heavy freezing drizzle"
  | "Patchy light rain"
  | "Patchy light rain"
  | "Light rain"
  | "Light rain"
  | "Moderate rain at times"
  | "Moderate rain at times"
  | "Moderate rain"
  | "Moderate rain"
  | "Heavy rain at times"
  | "Heavy rain at times"
  | "Heavy rain"
  | "Heavy rain"
  | "Light freezing rain"
  | "Light freezing rain"
  | "Moderate or heavy freezing rain"
  | "Moderate or heavy freezing rain"
  | "Light sleet"
  | "Light sleet"
  | "Moderate or heavy sleet"
  | "Moderate or heavy sleet"
  | "Patchy light snow"
  | "Patchy light snow"
  | "Light snow"
  | "Light snow"
  | "Patchy moderate snow"
  | "Patchy moderate snow"
  | "Moderate snow"
  | "Moderate snow"
  | "Patchy heavy snow"
  | "Patchy heavy snow"
  | "Heavy snow"
  | "Heavy snow"
  | "Ice pellets"
  | "Ice pellets"
  | "Light rain shower"
  | "Light rain shower"
  | "Moderate or heavy rain shower"
  | "Moderate or heavy rain shower"
  | "Torrential rain shower"
  | "Torrential rain shower"
  | "Light sleet showers"
  | "Light sleet showers"
  | "Moderate or heavy sleet showers"
  | "Moderate or heavy sleet showers"
  | "Light snow showers"
  | "Light snow showers"
  | "Moderate or heavy snow showers"
  | "Moderate or heavy snow showers"
  | "Light showers of ice pellets"
  | "Light showers of ice pellets"
  | "Moderate or heavy showers of ice pellets"
  | "Moderate or heavy showers of ice pellets"
  | "Patchy light rain with thunder"
  | "Patchy light rain with thunder"
  | "Moderate or heavy rain with thunder"
  | "Moderate or heavy rain with thunder"
  | "Patchy light snow with thunder"
  | "Patchy light snow with thunder"
  | "Moderate or heavy snow with thunder"
  | "Moderate or heavy snow with thunder";
