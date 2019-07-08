import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  let total = good + bad + neutral;
  let arvo = good + -1 * bad;
  let ka = arvo / total;
  let pos = good / total;
  if (total === 0) {
    return (
      <div>
        <h1>Tilastoja</h1>
        <p>Palautteita ei ole annettu</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Tilastoja</h1>
      <table>
        <tbody>
          <Statistic text="Hyvä:" value={good} />
          <Statistic text="Neutraali:" value={neutral} />
          <Statistic text="Huono:" value={bad} />
          <Statistic text="Yhteensä:" value={total} />
          <Statistic text="Keskiarvo:" value={ka} />
          <Statistic text="Positiivisia palautteita:" value={pos} />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = props => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>Anna palautetta</h1>
      <Button handleClick={handleClickGood} text="Hyvä" />
      <Button handleClick={handleClickNeutral} text="Neutraali" />
      <Button handleClick={handleClickBad} text="Huono" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
