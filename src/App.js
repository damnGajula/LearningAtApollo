import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState([]);
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleButtonPress = (value) => {
    if (value === '=') {
      try {
        const expression = input.join('');
        const newResult = eval(expression);
        setResult(newResult);
        setHistory(prevHistory => [...prevHistory, `${expression} = ${newResult}`]);
        setInput([]);
      } catch (error) {
        setResult('Error');
        setInput('');
      }
    } else if (value === 'C') {
      setInput([]);
      setResult('');
    } else {
      setInput(prevInput => [...prevInput, value]);
    }
  };

  const buttonValues = [
    ['7', '8', '9', '+'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '*'],
    ['0', '.', '=', '/'],
    ['C']
  ];

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td colSpan="4">
              <input type="text" value={input.join('')} readOnly />
            </td>
          </tr>
          {buttonValues.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((buttonValue, columnIndex) => (
                <td key={columnIndex}>
                  <button onClick={() => handleButtonPress(buttonValue)}>
                    {buttonValue}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {result && <div>{result}</div>}
      <div>
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>React Calculator</h1>
      <Calculator />
    </div>
  );
};

export default App;
