import React from "react";
import NewAnecdote from "./components/NewAnecdote";

const App = props => {
  const anecdotes = props.store
    .getState()
    .sort((previous, current) => current.votes - previous.votes);

  const vote = id => {
    props.store.dispatch(createVoteAction(id));
  };

  const createVoteAction = id => {
    const anecdoteWithAction = {
      type: "VOTE",
      data: { id }
    };
    return anecdoteWithAction;
  };

  const createAnecdote = () => {
    console.log("cliked");
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <NewAnecdote store={props.store} />
    </div>
  );
};

export default App;
