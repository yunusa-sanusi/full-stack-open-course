import { useState } from 'react';

const Display = (props) => {
  const { text, heading, voteCount } = props;
  return (
    <div>
      <h1>{heading}</h1>
      <p>{text}</p>
      <p>has {voteCount} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0,
    ),
  );

  const handleRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const votesCopy = [].concat(votes);
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const mostVotes = votes.reduce((acc, largestValue) => {
    if (acc > largestValue) {
      largestValue = acc;
    } else {
      return largestValue;
    }
    return largestValue;
  }, 0);

  const voteIndex = votes.findIndex((el) => el === mostVotes);

  return (
    <div>
      <Display
        heading="Anecdote of the day"
        text={anecdotes[selected]}
        voteCount={votes[selected]}
      />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <Display
        heading="Anecdote with the most votes"
        text={anecdotes[voteIndex]}
        voteCount={votes[voteIndex]}
      />
    </div>
  );
};

export default App;
