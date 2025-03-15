import React from "react";
import Img from "../assets/main-img.jpg";

function MainImg() {
    return (
        <div className=" m-2 rounded-lg h-[300px] overflow-hidden relative">
          <img className="w-full h-full object-cover" src={Img} alt="Main Img" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                <h1 className="text-4xl font-bold ml-4"><span className="text-orange-500">Sky</span><span className="text-blue-500">Check</span></h1>  
                <p className="text-lg"> Tu clima, en cualquier momento y lugar.</p>
            </div>
        </div>
    );
}
export default MainImg;