import React, { useState } from "react";
import newsDetails from "../../newsDetails.json";

function News() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full z-0 lg:w-2/5 border-solid border-2 m-2">
      <h1 className="text-center font-semibold">NEWS</h1>
      <div classname="grid grid-cols-1">
        {newsDetails.news.map((item, index) => (
          <div key={index} className="news-photo flex p-1 max-h-96 lg:relative" onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}>
            <img src={`/newsPhotos/${item.image}`} alt={item.title} 
             className={`lg:transition-opacity lg:duration-500 lg:ease-in-out ${
                hoveredIndex === index ? "lg:opacity-25" : "lg:opacity-100"
              }`}/>
            <div
              className={`text-over-art flex justify-center items-center p-2 lg:absolute lg:inset-0 lg:transition-opacity lg:duration-500 lg:ease-in-out ${
                hoveredIndex === index ? "lg:opacity-100" : "lg:opacity-0"
              }`}
            >
              <h1 className="uppercase text-3xl text-center tracking-wide">{item.title}</h1>

              {/* <a href={release.external} className="hover:underline">
                More info
              </a> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
