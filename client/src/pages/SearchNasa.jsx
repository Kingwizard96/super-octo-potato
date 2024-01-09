import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NASA_DATA } from '../queries'; // Define your GraphQL query

const SearchNasa = () => {
  const [startDate, setStartDate] = useState(''); // Set initial state for start date
  const [endDate, setEndDate] = useState(''); // Set initial state for end date

  const { loading, error, data } = useQuery(GET_NASA_DATA, {
    variables: { startDate, endDate },
  });

  const handleSearch = () => {
    // Trigger the query when the user performs a search
  };

  return (
    <div>
      <h2>Search NASA Images</h2>
      <div>
        <label>Start Date: </label>
        <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date: </label>
        <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data && data.getNasaData && (
        <div>
          {/* Render NASA images here based on the data received */}
          {data.getNasaData.data.map((image) => (
            <div key={image.date}>
              <h3>{image.title}</h3>
              <img src={image.url} alt={image.title} />
              <p>{image.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchNasa;