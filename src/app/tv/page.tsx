import React from "react";
import { cn } from "@/libs/utils";
import Card from "@/components/Cardwithoutdetails";
import Arrow from "@/components/Arrow";
import { Roboto_Mono } from "next/font/google";
import { FilterX } from "lucide-react";
const roboto = Roboto_Mono({ subsets: ["latin"] });
function page() {
  return (
    <div className="w-full pl-[100px] p-5 flex flex-col  h-full">
      <div className="flex pb-5 ">
        <h1 className={cn("font-bold text-[25px] pb-3")}> TV-Shows</h1>
      </div>
      <div className="flex flex-row pb-5  justify-between ">
        <div className="flex space-x-5">
          <h1 className={cn(roboto.className, "")}>Latest</h1>
          <h1 className={cn(roboto.className, "")}>trending</h1>
          <h1 className={cn(roboto.className, "")}>Top-Rated</h1>
        </div>
        <div className="flex items-center  ">
          <h1 className={cn(roboto.className, "")}>filter</h1>
          <FilterX className="text-[#A4B3C9] w-4 h-4" />
        </div>
      </div>
      <Card />
      <Arrow />
    </div>
  );
}

export default page;
