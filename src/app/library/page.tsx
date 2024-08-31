"use client";
import React from "react";

import { Roboto_Mono } from "next/font/google";
import { cn } from "@/libs/utils";
const roboto = Roboto_Mono({ subsets: ["latin"] });
function Page() {
  return (
    <div className="w-full md:pl-[100px] ml-1 md:p-5 flex flex-col  h-full">
      <div className="flex pb-5 ">
        <h1 className={cn("font-bold text-[25px] ")}> Movies</h1>
      </div>
      <div className="flex pb-5 space-x-5">
        <h1 className={cn(roboto.className, "")}>Watchlist</h1>
        <h1 className={cn(roboto.className, "")}>Continue-Watching</h1>
      </div>
      <div className="flex flex-row pb-5  justify-between ">
        <div className="flex space-x-5">
          <h1 className={cn(roboto.className, "")}>Movies</h1>
          <h1 className={cn(roboto.className, "")}>Tv-Show</h1>
        </div>
      </div>

      <h1> Coming Sooon</h1>
    </div>
  );
}

export default Page;
