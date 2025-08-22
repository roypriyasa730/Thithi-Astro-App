import './App.css';
import React, { useState } from 'react';

function App() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [thithi, setThithi] = useState("");
  const [occasions, setOccasions] = useState([]);
  
  // Function to handle Tithi calculation

  const handleCalculate = () => {
    if (!date || !location) {
      alert("Please select date and enter location!");
      return;

      const mockThithiList = [
        "Pratipada",
      "Dvitiya",
      "Tritiya",
      "Chaturthi",
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
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>🪔 Thithi Finder</h1>

      <div style={{ margin: "20px" }}>
        <label>Select Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>

      <div style={{ margin: "20px" }}>
        <label>Enter Location: </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or coordinates"
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>

      <button
        onClick={handleCalculate}
        style={{
          padding: "10px 20px",
          background: "#6a0dad",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Get Thithi
      </button>

      {thithi && (
        <div style={{ marginTop: "30px" }}>
          <h2>📅 Thithi: {thithi}</h2>

          {occasions.length > 0 && (
            <div>
              <h3>✨ Auspicious Occasions:</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {occasions.map((item, index) => (
                  <li key={index}>✅ {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
}

// Export the App component
export default App;