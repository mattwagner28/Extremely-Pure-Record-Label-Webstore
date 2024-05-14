import React, { useState } from "react";
import releasesData from '../../albumDetails.json';

function Releases() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const albumInfoText = "uppercase font-semibold";

    return (
        <div className='w-2/5 border-solid border-2 m-2'>
            <h1 className="text-center font-semibold">RECENT RELEASES</h1>
            <div className="grid grid-cols-2">
                {releasesData.releases.map((release, index) => (
                    <div
                        key={index}
                        className='cover-art p-1 relative'
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className={`text-over-art p-2 absolute ${hoveredIndex === index ? 'block' : 'hidden'}`}>
                            <h3 className={albumInfoText}>{release.artist}</h3>
                            <p>{release.title}</p>
                            <p>{release.type}</p>
                            <p>{release.format}</p>
                        </div>
                        <img src={`/albumart/${release.image}`} alt={release.title} className={`${hoveredIndex === index ? 'opacity-25' : 'opacity-100'}`}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Releases;
