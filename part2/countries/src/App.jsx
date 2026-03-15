import { useEffect } from 'react';
import { useState } from 'react'
import { fetchCountries } from './services/countries';
import { Country } from './components/Country';

function App() {
  const [search, setSearch] = useState(null);
  const [message, setMessage]= useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    searchCountries(search);
  }, [search])

  const searchCountries = async (searchTerm) => {
    setCountries([]);
    setMessage(null);

    if (!searchTerm){
      return;
    }

    const countries = await fetchCountries();

    // todo filter the results
    const matchingCountries = countries.filter((c) => {
      const searchLowercase = searchTerm.toLowerCase();
      const name = c?.name?.common?.toLowerCase()
      const official = c?.name?.official?.toLowerCase()
      

      return name.includes(searchLowercase) || official.includes(searchLowercase)
  
    }) ?? [];

    console.log({countries, matchingCountries})

    if (matchingCountries.length > 10) {
      setMessage('Too many matches, specify a more precise search');
    }

    if (matchingCountries.length > 0 && matchingCountries.length <= 10) {
      setCountries(matchingCountries);
    }
  }

  console.log({countries})

  return (
    <>
      <div>
        <label htmlFor='country-search'>Find countries</label>
        <input name='country-search' onChange={(e) => setSearch(e.target.value)} />
      </div>

      {
        message && (<div>{message}</div>)
      }

      {
        countries.length > 1 && (
          countries.map((c) => (<div>{c?.name?.common}</div>))
        )
      }

      {
        countries.length === 1 && (
          <Country {...countries[0]}/>
        )
      }
    </>
  )
}

export default App
