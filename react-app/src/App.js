import './App.css';
import React, { useState } from 'react';

function App() {
  const [date, setDate] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h2>Thithi Astro App</h2>

        <label>Select Date: </label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />

        {date && <p>You selected: {date}</p>}
      </header>
    </div>
  );
}

export default App;