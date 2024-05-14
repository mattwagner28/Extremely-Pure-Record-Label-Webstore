import React from "react";

function Logo() {
    return (
        <div className='flex justify-center'>
            
                {/* <img className='logo' src='./logo.gif' alt='GIF of Extremely Pure Logo' width='644' height='362' /> */}
                <video autoPlay loop muted width='644' height='362'>
                <source src='logo.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
        </div>
    )
  }
  
  export default Logo;


  