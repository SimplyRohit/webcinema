import React from "react";
import Image from "next/image";
import Slider from "./Slider";
import { db } from "@/DB/db";
function AllStuff() {
  return (
    <>
      <div className=" pb-[40px] pt-[40px] flex flex-col">
        <h1 className="font-bold text-[25px] pb-3">Recommendation</h1>
        <Slider />
      </div>
      <div className=" pb-[40px] flex flex-col">
        <h1 className="font-bold text-[25px] pb-3">Recommendation</h1>
        <Slider />
      </div>
      <div className=" pb-[40px] flex flex-col">
        <h1 className="font-bold text-[25px] pb-3">Recommendation</h1>
        <Slider />
      </div>
    </>
  );
}

export default AllStuff;
