export const Country = ({area, name, capital, languages, flags: {png}}) => {
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
      
    </div>
  )
}