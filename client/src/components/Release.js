import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Release() {
  const { artistName, releaseTitle } = useParams();

  useEffect(() => {

    //Retrieves data for individual release item
    const fetchData = async () => {
    try {
       const getReleaseData = await fetch(`http://localhost:3001/shop/${artistName}/${releaseTitle}`);
       const releaseData = await getReleaseData.json();
        console.log(releaseData);
    }
    catch (error) {
        console.error("Error in getting release info:", error)
    }

    }

    fetchData();
}, [artistName, releaseTitle])
  
  return (
    <div>
      <h1>Product Detail</h1>
      
      <p>{artistName}</p>
      <p>{releaseTitle}</p>
    </div>
  );
}

export default Release;
