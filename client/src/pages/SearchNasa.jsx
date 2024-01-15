import React, { useState, useEffect } from 'react';
import './SearchNasa.css';
const SearchNasa = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [apodData, setApodData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API call to NASA APOD API
    const apiKey = 'C9mVvyOk2bsKleMhZo6sVh5zsfZuhGisrKufTdxA';
    const apiUrl = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=C9mVvyOk2bsKleMhZo6sVh5zsfZuhGisrKufTdxA`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApodData(data);
      console.log('Received Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {apodData ? (
        <div className='card-container'>
          {apodData.map((dayData) => (
            <div className='card' key={dayData.date}>
              {dayData.media_type === 'image' ? (
                <img src={dayData.url} alt={dayData.title} />
              ) : dayData.media_type === 'video' ? (
                <iframe
                  title={dayData.title}
                  src={dayData.url}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Unsupported media type</p>
              )}
              <h2>{dayData.title}</h2>
              <p>{dayData.date}</p>
              <p>{dayData.explanation}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available. Please submit the form.</p>
      )}
    </div>
  );
};

export default SearchNasa;


// export default SearchNasa;





// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_NASA_IMAGES } from '../utils/queries'; // Define your GraphQL query

// const SearchNasa = () => {
//   const [startDate, setStartDate] = useState(''); // Set initial state for start date
//   const [endDate, setEndDate] = useState(''); // Set initial state for end date
//   const [queryData, setqueryData] = useState();
//   const { loading, error, data } = useQuery(GET_NASA_IMAGES, {
//     variables: { startDate, endDate },
//   });





//   const handleSearch = () => {
    
//     useEffect(()=>{
//       return (data) => {
//        setqueryData(data)
//       }
//    },[data] )

   
//   //    Trigger the query when the user performs a search
//   };


//   return (
//     <div fluid className='bg-dark text-light'>
//       <h2>Search NASA Images</h2>
//       <p>Example Date:"2021-01-15"</p>
//       <div>
//         <label>Start Date: </label>
//         <input 
//         type="text" 
//         placeholder='YYYY-MM-DD' 
//         value={startDate} 
//         onChange={(e) => setStartDate(e.target.value)}
//          />
//       </div>
//       <div>
//         <label>End Date: </label>
//         <input 
//         type="text" 
//         placeholder='YYYY-MM-DD' 
//         value={endDate} 
//         onChange={(e) => setEndDate(e.target.value)}
//          />
//       </div>
//       <button onClick={handleSearch}>Search</button>

//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error.message}</p>}

//       {queryData && queryData.getNasaData && (
//         <div>
//           {/* Render NASA images here based on the data received */}
//           {data.nasaImages.data.map((image) => (
//             <div key={image.date}>
//               <h3>{image.title}</h3>
//               <img src={image.url} alt={image.title} />
//               <p>{image.explanation}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// export default SearchNasa;