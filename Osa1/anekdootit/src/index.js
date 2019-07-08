import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = props => {
  const numberOfAnecdotes = anecdotes.length;
  let votes = Array.apply(null, Array(numberOfAnecdotes)).map(
    Number.prototype.valueOf,
    0
  ); //  0,0,0,0,0,0

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(votes);

  const handleClick = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    return setSelected(randomNumber);
  };

  const handleClickVote = () => {
    const copyVotes = [...vote];
    copyVotes[selected] += 1;
    setVote(copyVotes);
  };

  //Selvitetään maxäänet ja sen indeksi
  let maxAanet = 0;
  let maxIndeksi = null;

  for (let i = 0; i < vote.length; i++) {
    if (maxAanet <= vote[i]) {
      maxAanet = vote[i];
      maxIndeksi = i;
    }
  }

  return (
    <>
      <h1>Päivän anekdootti</h1>
      <p>{anecdotes[selected]}</p>
      <p>Tällä anekdootilla on {vote[selected]} ääntä</p>
      <Button handleClick={handleClickVote} text="Äänestä" />
      <Button handleClick={handleClick} text="Seuraava anekdootti" />
      <h1>Eniten ääniä saanut anekdootti</h1>
      <p>{anecdotes[maxIndeksi]}</p>
      <p>Tällä anekdootilla on {maxAanet} ääntä</p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App />, document.getElementById("root"));
