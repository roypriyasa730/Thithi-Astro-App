import './App.css';
import React, { useState } from 'react';

function App() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [thithi, setThithi] = useState("");
  const [occasions, setOccasions] = useState([]);

  const handleCalculate = () => {
    if (!date || !location) {
      alert("Please select date and enter location!");
      return;
    }

    const mockThithiList = [
      "Pratipada", "Dvitiya", "Tritiya", "Chaturthi",
      "Panchami", "Shashthi", "Saptami", "Ashtami",
      "Navami", "Dashami", "Ekadashi", "Dvadashi",
      "Trayodashi", "Chaturdashi", "Purnima/Amavasya"
    ];

    const randomThithi =
      mockThithiList[Math.floor(Math.random() * mockThithiList.length)];

    setThithi(randomThithi);

    if (randomThithi === "Chaturthi") {
      setOccasions(["Ganesh Chaturthi"]);
    } else if (randomThithi === "Ekadashi") {
      setOccasions(["Ekadashi Vrat"]);
    } else {
      setOccasions([]);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Thithi Finder</h1>

      <div className="input-group">
        <label>Select Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Enter Location: </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or coordinates"
        />
      </div>

      <button onClick={handleCalculate} className="btn">
        Get Thithi
      </button>

      {thithi && (
        <div className="result">
          <h2> Thithi: {thithi}</h2>

          {occasions.length > 0 && (
            <div>
              <h3>✨ Auspicious Occasions:</h3>
              <ul>
                {occasions.map((item, index) => (
                  <li key={index}> {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
