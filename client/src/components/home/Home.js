import React from "react";
// import News from "./News";
import Releases from "./Releases";

function Home() {
    return (
        <div className='mt-20 w-full flex flex-col lg:flex-row-reverse lg:justify-center lg:mt-1'>
            {/* <h1>COMING SOON!</h1> */}
            <Releases />
            {/* <News /> */}
        </div>
    )
}

export default Home;