export const fetchTheWeather = async () => {
  const token = import.meta.env.VITE_WEATHER_API;

  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?q=Barcelona",
    {
      method: "POST",
      headers: {
        key: token,
        accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
