import React, { useState } from "react";
import Numbers from "./components/Numbers";
import Filters from "./components/Filters";
import Forms from "./components/Forms";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState(""); // nimi inputin arvo
  const [newNumber, setNewNumber] = useState(""); //numero inputin arvo
  const [filterInput, setFilterInput] = useState(""); //filter inputin arvo

  const handleChangeName = event => {
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
    setFilterInput(inputFieldValue);
  };

  const AddName = event => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };

    const checkList = persons.map(person => person.name);
    if (checkList.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(personObj));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filters
        filterInput={filterInput}
        handleChangeFilter={handleChangeFilter}
      />
      <h2>Add a new</h2>
      <Forms
        AddName={AddName}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers:</h2>
      <Numbers persons={persons} filterInput={filterInput} />
    </div>
  );
};

export default App;
