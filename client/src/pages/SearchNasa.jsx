import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NASA_IMAGES } from '../utils/queries'; // Define your GraphQL query

const SearchNasa = () => {
  const [startDate, setStartDate] = useState(''); // Set initial state for start date
  const [endDate, setEndDate] = useState(''); // Set initial state for end date
  const [queryData, setqueryData] = useState();
  const { loading, error, data } = useQuery(GET_NASA_IMAGES, {
    variables: { startDate, endDate },
  });





  const handleSearch = () => {
    
    useEffect(()=>{
      return (data) => {
       setqueryData(data)
      }
   },[data] )

   
  //    Trigger the query when the user performs a search
  };


  return (
    <div fluid className='bg-dark text-light'>
      <h2>Search NASA Images</h2>
      <p>Example Date:"2021-01-15"</p>
      <div>
        <label>Start Date: </label>
        <input 
        type="text" 
        placeholder='YYYY-MM-DD' 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)}
         />
      </div>
      <div>
        <label>End Date: </label>
        <input 
        type="text" 
        placeholder='YYYY-MM-DD' 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)}
         />
      </div>
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {queryData && queryData.getNasaData && (
        <div>
          {/* Render NASA images here based on the data received */}
          {data.nasaImages.data.map((image) => (
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