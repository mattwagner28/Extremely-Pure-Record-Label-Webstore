import React from "react";
import News from "./News";
import Releases from "./Releases";

function Home() {
    return (
        <div className='w-full flex flex-col lg:flex-row-reverse justify-center mt-1'>
            {/* <h1>COMING SOON!</h1> */}
            <Releases />
            <News />
        </div>
    )
}

export default Home;