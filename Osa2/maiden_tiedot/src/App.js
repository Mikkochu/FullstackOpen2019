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

  //console.log("Count", filteredCountries.length);

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
  return filteredCountries.map((country, index) => (
    <div key={country.name}>
      {country.name}
      <button onClick={() => handleButtonClick(country.name)}>show</button>
    </div>
  ));
};

const SingleCountry = ({ singleCountryObject }) => {
  //console.log("kielet", singleCountryObject.languages);
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
    </div>
  );
};

const Languages = ({ languages }) => {
  return languages.map(language => (
    <li key={language.name}>{language.name}</li>
  ));
};

function App() {
  const [countries, setCountries] = useState("");
  const [filterValue, setfilterValue] = useState("");

  const handleFilter = event => {
    let inputValue = event.target.value;
    setfilterValue(inputValue);
  };

  const handleButtonClick = name => {
    console.log("name", name);
    setfilterValue(name);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      //console.log("response", response);
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
