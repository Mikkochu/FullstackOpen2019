import React from "react";

const Numbers = ({ persons, filterInput }) => {
  //filtteröidään person-lista filtteröintikentän perusteella ja sitten renderöidään filtteröidyt näytölle
  return persons
    .filter(person =>
      person.name.toLowerCase().includes(filterInput.toLowerCase())
    )
    .map((person, index) => (
      <p key={index}>
        {person.name} {person.number}
      </p>
    ));
};

export default Numbers;
