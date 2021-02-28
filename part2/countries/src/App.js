import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  const fahrenheitToCelsius = fahrenheit => parseInt((fahrenheit - 32) * 5 / 9)

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {
      params: {
        access_key: api_key,
        query: city,
        units: 'f'
      }
    }).then(res => {
      const current = res.data.current
      setWeather({ ...current, temperature: fahrenheitToCelsius(current.temperature) })
    })
  }, [api_key, city])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>
        <b>temperature: </b>{weather.temperature} Celsius
      </div>
      <img src={weather.weather_icons} alt="weather_icon" />
      <div>
        <b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    </div>
  )
}

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="120" />
      <Weather city={country.capital} />
    </div>
  )
}

const Countries = ({ countries, filter, setFilter }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />
  }
  return (
    <div>
      {filteredCountries.map(country => (
        <div key={country.name}>
          {country.name}
          <button onClick={() => setFilter(country.name)}>show</button>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  return (
    <div>
      find countries <input value={keyword} onChange={event => setKeyword(event.target.value)} />
      <Countries countries={countries} filter={keyword} setFilter={setKeyword} />
    </div>
  )
}

export default App
