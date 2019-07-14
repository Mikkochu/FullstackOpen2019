import React, { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import Filters from "./components/Filters";
import Forms from "./components/Forms";
import Phonenumbers from "./services/Phonenumbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(""); // nimi inputin arvo
  const [newNumber, setNewNumber] = useState(""); //numero inputin arvo
  const [filterInput, setFilterInput] = useState(""); //filter inputin arvo

  useEffect(() => {
    Phonenumbers.getData().then(person => {
      setPersons(person);
    });
  }, []);

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

  const handleRemovePerson = id => {
    const personToRemove = persons.find(person => person.id === id);

    let message = `Do you really want to delete ${personToRemove.name}`;
    let result = window.confirm(message); //Palauttaa boolean

    if (result) {
      //Jos totta niin poistetaan henkilo
      Phonenumbers.removePerson(personToRemove.id).then(() => {
        //SetPersoniin asetetaan filtteröity lista ilman poistettua henkilöä
        setPersons(persons.filter(person => person.id !== personToRemove.id));
      });
    }
  };

  const AddName = event => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };

    const personToUpdate = persons.find(person => person.name === newName);

    const checkList = persons.map(person => person.name);
    //Tarkastaa onko newName persons listassa
    if (checkList.includes(newName)) {
      let message = `${newName} is already added to the phonebook, replace the old number with a new one?`;
      let result = window.confirm(message);
      // Jos käyttäjä klikkaa ok niin päivitetään serverillä olevaa listaa personsObj ja asetetaan Appissa olevaan persons-tilamuuttujaan
      // vanha lista ja updatephonebook-metodin palauttama uusi henkilö
      if (result) {
        Phonenumbers.updatePhonebook(personToUpdate.id, personObj).then(
          updatedPerson => {
            //updatedPerson on sama kuin personObj. Sama nimi ja id, uusi numero.

            setPersons(
              persons.map(
                person =>
                  person.id !== personToUpdate.id ? person : updatedPerson
                //Jos loopattu person.id on eri kuin päivitetyn henkilön id niin vanhan listan person uuteen listaan. Jos id on sama niin lisätään updated person, jolla on nyt uusi numero.
              )
            );
          }
        );
      }
    } else {
      Phonenumbers.createPhonebook(personObj).then(person => {
        setPersons(persons.concat(person));
      });
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
      <Numbers
        persons={persons}
        filterInput={filterInput}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  );
};

export default App;
