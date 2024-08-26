import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/DB/db";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";
const roboto = Roboto_Mono({ subsets: ["latin"] });
export default function Card() {
  return (
    <div className=" flex  flex-wrap  items-center jutify-between w-full   h-full">
      {db.slice(0, 18).map((item) => (
        <div key={item.name} className="flex flex-col pt-3 pb-14 pr-10 h-full ">
          <Image
            className="object-cover h-[250px] w-[140px]  rounded-lg"
            src={item.url}
            width={1920}
            height={1080}
            alt=""
          ></Image>
          <p className={cn(roboto.className, "")}>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
