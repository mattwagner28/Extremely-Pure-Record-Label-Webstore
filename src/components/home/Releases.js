import React, { useState } from "react";
import releasesData from "../../albumDetails.json";

function Releases() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full z-0 lg:w-4/5 border-solid border-2 m-2">
      <h1 className="text-center font-semibold">RELEASES</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4" >
        {releasesData.releases.map((release, index) => (
          <div 
            key={index}
            className="cover-art p-1 lg:relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={`/albumart/${release.image}`}
              alt={release.title}
              className={`lg:transition-opacity lg:duration-500 lg:ease-in-out ${
                hoveredIndex === index ? "lg:opacity-25" : "lg:opacity-100"
              }`}
            />
                <div
                className={`text-over-art p-2 lg:absolute lg:inset-0 lg:transition-opacity lg:duration-500 lg:ease-in-out ${
                  hoveredIndex === index ? "lg:opacity-100" : "lg:opacity-0"
                }`}
                >
                <h3 className="uppercase font-semibold">{release.artist}</h3>
                <p className="italic font-semibold">{release.title}</p>
                <p>{release.type}</p>
                <p>{release.format}</p>
                <a href={release.external} className="hover:underline">
                    More info
                </a>
                </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Releases;
