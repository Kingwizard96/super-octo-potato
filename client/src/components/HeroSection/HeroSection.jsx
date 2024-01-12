import React from "react";
import { useEffect, useState } from "react";
import Style from './HeroSection.module.css';
import { Button } from "../componentsindex";

const HeroSection = () => {
    const [photoData, setPhotoData ] = useState(null);

    useEffect(() => {
       fetchPhoto();
        
        async function fetchPhoto() {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=C9mVvyOk2bsKleMhZo6sVh5zsfZuhGisrKufTdxA`);
            const data = await res.json();
            setPhotoData(data);
        }
    }, []);

    if(!photoData) return <div />;

    return (
        <div className={Style.heroSection}>
            <div className={Style.heroSection_box}>
                <div className={Style.heroSection_box_left}>
                <h1>{photoData.title}</h1>
                <p>{photoData.explanation}</p>
                <Button btnName='View Old Photos'/>
                </div>
                <div className={Style.heroSection_box_right}>
                <img
                src={photoData.url} 
                alt={photoData.title}
                width={600}
                height={600}
                 />
                </div>
            </div>

        </div>
    )
}

export default HeroSection;