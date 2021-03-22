import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === '') {
      setCountry(null)
      return
    }
    axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(res => {
        const country = { data: res.data[0], found: true }
        setCountry(country)
      })
      .catch(err => {
        setCountry({ found: false })
      })
  }, [name])

  return country
}
