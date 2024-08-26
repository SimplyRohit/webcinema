import React from "react";
import { cn } from "@/libs/utils";
import Card from "@/components/Cardwithoutdetails";
import Arrow from "@/components/Arrow";
import { Roboto_Mono } from "next/font/google";
import { Roboto_Serif } from "next/font/google";
import { FilterX } from "lucide-react";
const roboto = Roboto_Mono({ subsets: ["latin"] });
const sans = Roboto_Serif({ subsets: ["latin"] });
function page() {
  return (
    <div className="w-full h-full items-center p-10 pr-12 pl-[100px] flex flex-col">
      <div className="">
        <input
          className={cn(
            roboto.className,
            "rounded-lg w-[400px] h-[48px] bg-black text-[13px] px-3 placeholder:text-[12px] placeholder:text-[#5c6065] outline-none text-[#ffc31e]  "
          )}
          placeholder="please enter at least 3 characters to search ....."
          type="text"
        />
      </div>
      <div className=" pt-5 flex items-center space-x-4 w-full h-full">
        <h1 className={cn(sans, "  text-[25px]")}>All Collections</h1>
        <h1 className={cn("font-bold text-[#ffc31e] text-[25px]")}></h1>
      </div>
      <Card />
      <Arrow />
    </div>
  );
}

export default page;
