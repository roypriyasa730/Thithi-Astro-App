import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [thithi, setThithi] = useState("");
  const [occasions, setOccasions] = useState([]);

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      },
      (error) => {
        alert("Failed to get location: " + error.message);
      }
    );
  };

  // Function to handle Tithi calculation
  const handleCalculate = () => {
    if (!date || !location) {
      alert("Please select date and enter location!");
      return;
    }

    // Call the Django API to calculate Tithi
    fetch("http://127.0.0.1:8000/api/tithi/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        location: location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setThithi(data.tithi);
          setOccasions([]); // You can set occasions based on tithi if needed
        } else {
          alert("Error calculating Tithi: " + (data.error || "Unknown error"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to connect to server");
      });
  };

  const handleReset = () => {
    setDate("");
    setLocation("");
    setThithi("");
    setOccasions([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1> Thithi Finder</h1>

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
          marginRight: "10px"
        }}
      >
        Get Thithi
      </button>

      <button
        onClick={handleReset}
        style={{
          padding: "10px 20px",
          background: "#ff6b6b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Reset
      </button>

      {thithi && (
        <div style={{ 
          marginTop: "30px", 
          padding: "20px", 
          backgroundColor: "#f9f9f9", 
          borderRadius: "10px", 
          maxWidth: "500px", 
          margin: "30px auto" 
        }}>
          <h2 style={{ color: "#6a0dad" }}>🌙 Thithi: {thithi}</h2>

          {occasions.length > 0 && (
            <div>
              <h3 style={{ color: "#4CAF50" }}>✨ Auspicious Occasions:</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {occasions.map((item, index) => (
                  <li key={index} style={{ margin: "5px 0" }}>🎉 {item}</li>
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
