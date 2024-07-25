import React from "react";

function Logo() {
    return (
        <div className='flex justify-center overflow-hidden'>
            
            <video className="static" autoPlay loop muted width='644' height='362'>
                <source src='15secVidNoLogo.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <img className="absolute z-10" width='660' height='371' src='clearLogo.png' alt='extremely pure logo'></img>
        </div>
    );
}

export default Logo;


