const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherForCoordinates = async ([lat, lng]) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`

  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}