import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryDetail = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="120"/>
    </div>
  )
}

const Countries = ({countries, filter}) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]}/>
  }
  return (
    <div>
      {filteredCountries.map(country => (
        <div key={country.name}>
          {country.name}
          <button>show</button>
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
      find countries <input value={keyword} onChange={event => setKeyword(event.target.value)}/>
      <Countries countries={countries} filter={keyword}/>
    </div>
  )
}

export default App
