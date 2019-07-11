import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filterValue, handleFilter }) => {
  return (
    <div>
      Find countries: <input value={filterValue} onChange={handleFilter} />
    </div>
  );
};

const Display = ({ countries, filterValue, handleButtonClick }) => {
  if (countries.length === 0) return null;

  let filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  if (countries.length === filteredCountries.length) return null;
  else if (filteredCountries.length === 1) {
    let singleCountryObject = filteredCountries[0];
    return <SingleCountry singleCountryObject={singleCountryObject} />;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10)
    return (
      <ManyCountries
        filteredCountries={filteredCountries}
        handleButtonClick={handleButtonClick}
      />
    );
  else if (filteredCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;
};

const ManyCountries = ({ filteredCountries, handleButtonClick }) => {
  return filteredCountries.map(country => (
    <div key={country.name}>
      {country.name}
      <button onClick={() => handleButtonClick(country.name)}>show</button>
    </div>
  ));
};

const SingleCountry = ({ singleCountryObject }) => {
  let languages = singleCountryObject.languages;
  return (
    <div>
      <h1>{singleCountryObject.name}</h1>
      <p>Capital: {singleCountryObject.capital}</p>
      <p>Population: {singleCountryObject.population}</p>
      <h3>Languages</h3>
      <ul>
        <Languages languages={languages} />
      </ul>
      <img src={singleCountryObject.flag} alt="flag" width="150" height="100" />
      <Weather singleCountryObject={singleCountryObject} />
    </div>
  );
};

const Languages = ({ languages }) => {
  return languages.map(language => (
    <li key={language.name}>{language.name}</li>
  ));
};

const Weather = ({ singleCountryObject }) => {
  const [weather, setWeather] = useState("");

  let capitalCity = singleCountryObject.capital;

  useEffect(() => {
    axios
      .get(
        `http://api.apixu.com/v1/current.json?key=9a84b983a1064f58b73141027191107&q=${capitalCity}`
      )
      .then(response => {
        const apiData = response.data;
        const weatherObj = {
          temp: apiData.current.temp_c,
          windDirection: apiData.current.wind_dir,
          windSpeed: apiData.current.wind_kph,
          weatherImage: apiData.current.condition.icon
        };
        setWeather(weatherObj);
      });
  }, [capitalCity]);

  return (
    <div>
      <h3>Weather in {capitalCity}</h3>
      <b>Temperature:</b> {weather.temp} Celcius
      <br />
      <img src={weather.weatherImage} alt="weatherImage" />
      <br />
      <b> Wind:</b> {weather.windSpeed} kph direction {weather.windDirection}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState("");
  const [filterValue, setfilterValue] = useState("");

  const handleFilter = event => {
    let inputValue = event.target.value;
    setfilterValue(inputValue);
  };

  const handleButtonClick = name => {
    setfilterValue(name);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <Filter filterValue={filterValue} handleFilter={handleFilter} />
      <Display
        countries={countries}
        filterValue={filterValue}
        handleButtonClick={handleButtonClick}
      />
    </>
  );
}

export default App;
