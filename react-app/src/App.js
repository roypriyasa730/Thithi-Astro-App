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

  const handleGoogleSearch = () => {
    
  };

  return (
    <div className="App">
      <header className="App-header">
        
        
        {/* Google Search Section */}
        <div style={{ marginBottom: '30px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'top' }}>
            <input
              type="text"
              placeholder="Search on Google..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission
                  // Do nothing - only search when button is clicked
                }
              }}
              style={{ padding: '8px', minWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
            />

        
            <button
              type="button"
              onClick={handleGoogleSearch}
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
          </div>
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
            {result && <p>{result}</p>} 
          </form>

        </div>
      </header>
    </div>
  );
}

export default App;