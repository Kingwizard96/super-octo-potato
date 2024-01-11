import { useEffect, useState } from "react";

const apiKey= process.env.REACT_APP_API_KEY;


export default function NasaPhoto() {
    const [photoData, setPhotoData ] = useState(null);

    useEffect(() => {
       fetchPhoto();
        
        async function fetchPhoto() {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
            const data = await res.json();
            setPhotoData(data);
        }
    }, []);

    if(!photoData) return <div />;

    return (
        <div>
            <div className="nasa-photo">
            {photoData.media_type === 'image' ? (
  <img src={photoData.url} alt={photoData.title} className="photo" />
) : (
  <iframe
    title="space-video"
    src={photoData.url}
    gesture="media"
    allow="encrypted-media"
    allowFullScreen
    className="photo"
  />
)}

            </div>
        <div>
           <h1>{photoData.title}</h1>
            <p className="explanation">{photoData.explanation}</p>
            <p className="date">{photoData.date}</p>
        </div>
        </div>
    )
}