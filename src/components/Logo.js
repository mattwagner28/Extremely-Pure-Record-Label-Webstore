import React from "react";

function Logo() {
    return (
        <div className='flex justify-center overflow-hidden'>
            <video autoPlay loop muted width='644' height='362' style={{ clipPath: 'inset(1px 1px)' }}>
                <source src='logoVid.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Logo;


  