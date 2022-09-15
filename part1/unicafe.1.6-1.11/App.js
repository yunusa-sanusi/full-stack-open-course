import { useState } from 'react';

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props.data;
  return (
    <>
      {good === 0 && bad === 0 && neutral === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={positive} />
          </tbody>
        </table>
      )}
    </>
  );
};

const StatisticsLine = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = (props) => {
  const { handleClick, value, text, fn } = props;
  return <button onClick={() => handleClick(fn, value)}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (fn, value) => {
    fn(value + 1);
  };

  const all = good + bad + neutral;
  const average = all / 3;
  const positive = good * (100 / all);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick} fn={setGood} value={good} text="good" />
      <Button
        handleClick={handleClick}
        fn={setNeutral}
        value={neutral}
        text="neutal"
      />
      <Button handleClick={handleClick} fn={setBad} value={bad} text="bad" />
      <h2>statistics</h2>
      <Statistics data={{ good, neutral, bad, average, all, positive }} />
    </div>
  );
};

export default App;
