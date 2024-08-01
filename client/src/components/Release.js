import React, { useEffect } from "react";
import releasesData from "../releaseDetails.json";
import { useParams } from "react-router-dom";

function Release() {
  const { artistName, releaseTitle } = useParams();

//   const [release, setRelease] = useState([]);

    //Get release data from albumDetails.json File
    const releaseData = releasesData.releases.find((release) => 
      release.title === releaseTitle
    );
    
    console.log("Release Data:", releaseData);


  useEffect(() => {



    //Retrieves product data from shop
    const fetchData = async () => {
    try {
       const getProductData = await fetch(`http://localhost:3001/shop/${artistName}/${releaseTitle}`);
       const productData = await getProductData.json();
    //    setRelease(releaseData);
       console.log("Product Data:", productData);
    }
    catch (error) {
        console.error("Error in getting product info:", error)
    }

    }

    fetchData();
}, [artistName, releaseTitle])
  
  return (
    <div className='flex w-full justify-center'>

      <div className="flex w-2/5 m-2 bg-slate-300">
        <img className="size-full" src={`/albumart/${releaseData.coverArt}`}></img>
      </div>

      <div className="flex w-2/5 m-2 bg-red-300">
        <h1>{releaseData.artist}</h1>

      </div>      


      {/* <p>{artistName}</p>
      <p>{releaseTitle}</p> */}
    </div>
  );
}

export default Release;
