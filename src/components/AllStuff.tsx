import React from "react";
import Slider from "./Slider";
function AllStuff() {
  return (
    <div className=" w-full h-full ">
      <div className=" pb-[40px] pt-[40px] ">
        <h1 className="font-bold text-[25px] pb-3">Recommendation</h1>
        <Slider />
      </div>
      <div className=" pb-[40px] ">
        <h1 className="font-bold text-[25px] pb-3">Recommendation</h1>
        <Slider />
      </div>
      <div className=" pb-[40px] ">
        <h1 className="font-bold text-[25px] pb-3">Recommendation</h1>
        <Slider />
      </div>
    </div>
  );
}

export default AllStuff;
