
import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [facilities, setFacilities] = useState([]);
  const [facilityName, setFacilityName] = useState('');
  const [mflCode, setMflCode] = useState('');

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = () => {
    fetch('/registry')
      .then(response => response.json())
      .then(data => setFacilities(data))
      .catch(error => console.error('Error fetching facilities:', error));
  };

  const handleAddFacility = (event) => {
    event.preventDefault();
    fetch('/registry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ facility_name: facilityName, mfl_code: mflCode })
    })
      .then(() => {
        fetchFacilities();
        setFacilityName('');
        setMflCode('');
      })
      .catch(error => console.error('Error adding facility:', error));
  };

  return (
    <div className="App">
      <h1>Facility Registry</h1>
      <form onSubmit={handleAddFacility}>
        <input type="text" value={facilityName} onChange={e => setFacilityName(e.target.value)} placeholder="Facility Name" required />
        <input type="text" value={mflCode} onChange={e => setMflCode(e.target.value)} placeholder="MFL Code" required />
        <button type="submit">Add Facility</button>
      </form>
      <ul>
        {facilities.map(facility => (
          <li key={facility.facility_id}>{facility.facility_name} - MFL Code: {facility.mfl_code}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
