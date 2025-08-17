import './App.css';
import React, { useState } from 'react';

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(`Tithi from ${startDate} to ${endDate} at ${location}`);
  };

  const handleGoogleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to Google search in the same tab/page 
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Tithi Calculator</h2>
        
        {/* Google Search Section */}
        <div style={{ marginBottom: '30px', padding: '20px' }}>
          <form onSubmit={handleGoogleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search on Google..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px', minWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#4285f4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </form>
        </div>

        {/* Tithi Calculator Section */}
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Calculate Tithi</h3>
          <form onSubmit={handleSubmit}>

            <div>
              <label>Start Date: </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label>End Date: </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Location: </label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>

          {result && <p>{result}</p>}
        </div> {/* Close Tithi Calculator Section */}
      </header>
    </div>
  );
}

export default App;