import React from "react";
import Slider from "./Slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/libs/utils";
const roboto = Roboto_Mono({ subsets: ["latin"] });
function AllStuff() {
  return (
    <div className="pl-1 w-full h-full ">
      <div className=" pb-[40px] pt-[40px] ">
        <div className="flex flex-row items-center justify-between ">
          <h1 className={cn("text-[25px] pb-3")}>Recommendation</h1>
          <div className="flex flex-row items-center pr-2 justify-center">
            <ChevronLeft className="text-[#A4B3C9] w-5 h-5" />
            <p className={cn(roboto.className, "text-[#A4B3C9] text-[12px]")}>
              swipe
            </p>
            <ChevronRight className="text-[#A4B3C9] w-5 h-5" />
          </div>
        </div>
        <Slider />
      </div>
      <div className=" pb-[40px] pt-[40px] ">
        <div className="flex flex-row items-center justify-between ">
          <h1 className={cn("text-[25px] pb-3")}>Recommendation</h1>
          <div className="flex flex-row items-center pr-2 justify-center">
            <ChevronLeft className="text-[#A4B3C9] w-5 h-5" />
            <p className={cn(roboto.className, "text-[#A4B3C9] text-[12px]")}>
              swipe
            </p>
            <ChevronRight className="text-[#A4B3C9] w-5 h-5" />
          </div>
        </div>
        <Slider />
      </div>{" "}
      <div className=" pb-[40px] pt-[40px] ">
        <div className="flex flex-row items-center justify-between ">
          <h1 className={cn("text-[25px] pb-3")}>Recommendation</h1>
          <div className="flex flex-row items-center pr-2 justify-center">
            <ChevronLeft className="text-[#A4B3C9] w-5 h-5" />
            <p className={cn(roboto.className, "text-[#A4B3C9] text-[12px]")}>
              swipe
            </p>
            <ChevronRight className="text-[#A4B3C9] w-5 h-5" />
          </div>
        </div>
        <Slider />
      </div>
    </div>
  );
}

export default AllStuff;
