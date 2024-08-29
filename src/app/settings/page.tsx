import React from "react";
import { cn } from "@/libs/utils";
import Card from "@/components/Cardwithoutdetails";
import Arrow from "@/components/Arrow";
import { Roboto_Mono } from "next/font/google";
import { FilterX } from "lucide-react";
const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function page() {
  return (
    <div className="w-full  flex items-center justify-center  h-full">
      <h1 className="text-3xl">Coming Soon ........</h1>
    </div>
    // <div className="w-full pl-[100px] p-5 flex flex-col  h-full">
    //   <div className="flex flex-col pb-5 ">
    //     <h1 className={cn("font-bold text-[25px] pb-3")}> Account</h1>
    //     <div className="flex  flex-col ">
    //       <h1 className={cn(roboto.className, "")}>Login</h1>
    //       <h1 className={cn(roboto.className, "")}>signup</h1>
    //     </div>
    //   </div>
    //   <div className="flex flex-col pb-5 ">
    //     <h1 className={cn("font-bold text-[25px] pb-3")}>Appearance</h1>
    //     <div className="flex  flex-col ">
    //       <h1 className={cn(roboto.className, "")}>Mode</h1>
    //       <h1 className={cn(roboto.className, "")}>Ascent Color</h1>
    //     </div>
    //   </div>
    //   <div className="flex flex-col pb-5 ">
    //     <h1 className={cn("font-bold text-[25px] pb-3")}> App Center</h1>
    //     <div className="flex  flex-col ">
    //       <h1 className={cn(roboto.className, "")}>Anime</h1>
    //       <h1 className={cn(roboto.className, "")}>K-drama</h1>
    //       <h1 className={cn(roboto.className, "")}>Random</h1>
    //       <h1 className={cn(roboto.className, "")}>Download</h1>
    //       <h1 className={cn(roboto.className, "")}>Disclaimer</h1>
    //       <h1 className={cn(roboto.className, "")}>Contact US</h1>
    //     </div>
    //   </div>
    //   <div className="flex flex-col pb-5 ">
    //     <h1 className={cn("font-bold text-[25px] pb-3")}> Links</h1>
    //     <div className="flex  flex-col ">
    //       <h1 className={cn(roboto.className, "")}>Website</h1>
    //     </div>
    //   </div>
    // </div>
  );
}
