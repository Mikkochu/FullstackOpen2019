import React from "react";
import { createVoteAction } from "../reducers/anecdoteReducer";

const AnecdoteList = props => {
  const anecdotes = props.store
    .getState()
    .sort((previous, current) => current.votes - previous.votes);

  const vote = id => {
    props.store.dispatch(createVoteAction(id));
  };

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
