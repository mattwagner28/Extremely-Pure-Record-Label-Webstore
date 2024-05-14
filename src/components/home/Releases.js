import React from "react";
import releasesData from '../../albumDetails.json';

function Releases() {
    return (
        <div className='w-2/5 border-solid border-2 m-2'>
            <h1 className="text-center font-semibold">RECENT RELEASES</h1>
                <div className="grid grid-cols-2">
                    {releasesData.releases.map((release, index) => (
                        <div className='cover art p-1'key={index}>
                            <div className="absolute">
                                <h3>{release.artist}</h3>
                                <p>{release.title}</p>
                                <p>{release.type}</p>
                                <p>{release.format}</p>
                            </div>
                            <img src={`/albumart/${release.image}`} alt={release.title} />
                        </div>
                ))}
                </div>
                
        </div>
    )
}

export default Releases;

