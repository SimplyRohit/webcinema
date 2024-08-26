import React from "react";
import { Roboto_Mono } from "next/font/google";
import { Roboto_Serif } from "next/font/google";
import { cn } from "@/libs/utils";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/DB/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Arrow from "@/components/Arrow";
import Card from "@/components/Card";
const sans = Roboto_Serif({ subsets: ["latin"] });
const roboto = Roboto_Mono({ subsets: ["latin"] });
function page() {
  return (
    <div className="w-full h-full items-center p-10 pr-12 pl-[85px] flex flex-col">
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
        <h1 className={cn(sans, " pl-10 text-[25px]")}>Top Searches</h1>
        <h1 className={cn("font-bold text-[#ffc31e] text-[25px]")}>today</h1>
      </div>
      <Card />
      <Arrow />
    </div>
  );
}

export default page;
