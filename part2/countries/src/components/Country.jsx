import { useEffect } from "react"
import { getWeatherForCoordinates } from "../services/weather"
import { useState } from "react"

export const Country = ({area, name, capital, capitalInfo, languages, flags: {png}}) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    getCapitalWeather()
  }, [capital])

  console.log({capitalInfo})

  async function getCapitalWeather() {
    const weather = await getWeatherForCoordinates(capitalInfo.latlng);

    setWeather(weather);
  }

  return (
    <div>
      <h1>{name.official}</h1>
      <div>Capital {capital}</div>
      <div>Area {area}</div>

      {languages && (
        <>
          <h2>Languages</h2>
          <ul>
            {Object.entries(languages).map(([k, v]) => {
              return (<li key={k}>{v}</li>)
            })}
          </ul>
          
        </>
      )}

      <div><img src={png} /></div>

      {weather && (<div>
        <h2>Weather in {capital}</h2>
        <h3>Temperature: {weather?.main?.temp} Celcius</h3>
        <img src={`https://openweathermap.org/payload/api/media/file/${weather?.weather?.[0].icon}.png`} />
        <h3>Wind: {weather?.wind?.speed} m/s</h3>
      </div>)}
    </div>
  )
}