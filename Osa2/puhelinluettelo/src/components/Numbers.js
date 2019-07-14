import React from "react";

const Numbers = ({ persons, filterInput, handleRemovePerson }) => {
  //filtteröidään person-lista filtteröintikentän perusteella ja sitten renderöidään filtteröidyt näytölle
  // Buttoniin on kiinnitetty eventhandler joka poistaa kyseisen henkilon. Eventhandler ottaa parametriksi id:n, joten jokaiseen nappiin on liitetty yksilöllinen id

  //console.log("persons", persons);
  return persons
    .filter(person =>
      person.name.toLowerCase().includes(filterInput.toLowerCase())
    )
    .map((person, index) => (
      <p key={index}>
        {person.name} {person.number}
        {"   "}
        <button onClick={() => handleRemovePerson(person.id)}>Delete</button>
      </p>
    ));
};

export default Numbers;
