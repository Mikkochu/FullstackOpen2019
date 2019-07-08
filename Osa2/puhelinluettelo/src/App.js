import React, { useState } from "react";

const Numbers = ({ listToShow }) => {
  const allPersons = () =>
    listToShow.map((item, index) => (
      <p key={item.name}>
        {item.name} {item.number}
      </p>
    ));

  return <div>{allPersons()}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState(""); // nimi inputin arvo
  const [newNumber, setNewNumber] = useState(""); //numero inputin arvo
  const [filterNames, setFilterNames] = useState(""); //filter inputin arvo
  const [showAll, setShowAll] = useState(true); //boolean, true jos filter inputissa tekstiä ja false jos ei

  const filteredObj = () =>
    persons.filter(person =>
      person.name.toLowerCase().includes(filterNames.toLowerCase())
    );

  //console.log("FilteredLista", filteredObj());

  const showList = () => {
    let lista;
    showAll ? (lista = persons) : (lista = filteredObj());

    return lista;
  };

  //console.log("show", showList());

  const handleChange = event => {
    let inputFieldValue = event.target.value;
    //console.log(inputFieldValue);
    setNewName(inputFieldValue);
  };

  const handleChangeNumber = event => {
    let inputFieldValue = event.target.value;
    //console.log(inputFieldValue);
    setNewNumber(inputFieldValue);
  };

  const handleChangeFilter = event => {
    let inputFieldValue = event.target.value;
    //console.log("Filter", inputFieldValue);

    if (inputFieldValue === "") {
      setShowAll(true);
    } else {
      setShowAll(false);
    }

    setFilterNames(inputFieldValue);
  };

  //console.log("NamesToShow", namesToShow());
  console.log("ShowAll", showAll);

  const addName = event => {
    event.preventDefault();

    //Lisää nimen ja numeron objektiin
    const newPersonObject = {
      name: newName,
      number: newNumber
    };

    //Testaa onko newName listassa, palauttaa boolean
    let etsiNimi = newName =>
      persons.map(person => person.name).includes(newName);

    if (etsiNimi(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newPersonObject));
      setNewName("");
      setNewNumber("");
    }
  };

  //console.log("Persons", persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          filter shown with{" "}
          <input value={filterNames} onChange={handleChangeFilter} />
          <h2>add a new</h2>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers: </h2>
      <Numbers listToShow={showList()} />
    </div>
  );
};

export default App;
