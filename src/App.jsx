import { useState } from 'react';
import './App.css';

export default function App() {
  const [addends, setAddends] = useState([]);

  function addRow() {
    setAddends((prevState) => {
      return [
        ...prevState,
        {
          id: crypto.randomUUID(),
          sign: '+',
          value: '',
          isDisabled: false,
        },
      ];
    });
  }

  function handleDelete(index) {
    setAddends((prevState) => prevState.filter((elem) => elem.id !== index));
  }

  function showSum() {
    let sum = 0;
    const numberArray = addends.map((item) => {
      if (item.value === '') {
        return 0;
      }
      if (item.sign === '-') {
        return -item.value;
      } else {
        return item.value;
      }
    });
    sum = numberArray.reduce((total, current) => total + current, sum);
    return sum;
  }

  function handleValueChange(event, index) {
    const nextAddends = addends.map((item) => {
      if (item.id === index) {
        return {
          ...item,
          value: isNaN(parseInt(event.target.value))
            ? ''
            : parseInt(event.target.value),
        };
      } else {
        return item;
      }
    });
    setAddends(nextAddends);
  }

  function handleSignChange(event, index) {
    const nextAddends = addends.map((item) => {
      if (item.id === index) {
        return {
          ...item,
          sign: event.target.value,
        };
      } else {
        return item;
      }
    });
    setAddends(nextAddends);
  }

  function handleDisable(index) {
    const nextAddends = addends.map((item) => {
      if (item.id === index) {
        return {
          ...item,
          isDisabled: !item.isDisabled,
        };
      } else {
        return item;
      }
    });
    setAddends(nextAddends);
  }

  const listAddends = addends.map((item) => {
    return (
      <div className="addend" key={item.id}>
        <select defaultValue="+" onChange={(e) => handleSignChange(e, item.id)}>
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
        <input
          type="number"
          value={item.value}
          onChange={(e) => handleValueChange(e, item.id)}
        />
        <button onClick={() => handleDisable(item.id)}>Disable</button>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </div>
    );
  });

  return (
    <>
      <div className="title">React Calculator</div>

      <button className="add-btn" onClick={addRow}>
        Add Row
      </button>
      {listAddends}
      {showSum()}
    </>
  );
}
