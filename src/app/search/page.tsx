import React from "react";
import { Roboto_Mono } from "next/font/google";
import { Roboto_Serif } from "next/font/google";
import { cn } from "@/libs/utils";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/DB/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className=" flex flex-wrap items-center jutify-between w-full  pl-[40px] h-full">
        {db.map((item) => (
          <Link
            key={item.name}
            href={""}
            className="flex py-10 pr-12 flex-row items-center"
          >
            <Image
              className="object-cover w-[140px] h-[230px] rounded-lg"
              src={item.url}
              width={1920}
              height={1080}
              alt=""
            ></Image>
            <div className="flex flex-col max-w-[210px] pl-4">
              <h1 className={cn("font-bold text-[20px]")}>{item.name}</h1>
              <p className={cn(roboto.className, "")}>{item.details}</p>
              <p className={cn(roboto.className, "")}>{item.category}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className=" flex  items-center space-x-2 justify-center w-full h-full">
        <ChevronLeft className="  bg-[#576B87] rounded-[50%] w-6 h-6" />
        <h1
          className={cn(
            " text-[#000000] px-3 rounded-[10px] bg-[#ffc31e] text-[20px]"
          )}
        >
          1
        </h1>
        <ChevronRight className="bg-[#576B87] rounded-[50%] w-6 h-6" />
      </div>
    </div>
  );
}

export default page;
