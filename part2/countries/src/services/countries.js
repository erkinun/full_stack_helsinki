export const fetchCountries = async () => {
  const result = await fetch('https://studies.cs.helsinki.fi/restcountries/api/all');

  if (result.ok) {
    return await result.json();
  }
  else {
    throw new Error('Error fetching countries', result.status)
  }
}