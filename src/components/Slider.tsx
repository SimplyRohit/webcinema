"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { db } from "@/DB/db";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/libs/utils";
const roboto = Roboto_Mono({ subsets: ["latin"] });
export default function Slider() {
  const [ref] = useKeenSlider({
    slides: {
      perView: 10,
      spacing: 15,
    },
  });

  return (
    <div ref={ref} className="keen-slider flex h-[270px] max-w-[1900px]   ">
      {db.map((item) => (
        <div className="keen-slider__slide  rounded">
          <Image
            className="object-cover w-full  h-[250px] rounded"
            src={item.url}
            alt=""
            width={1920}
            height={1080}
          ></Image>
          <p className={cn(roboto.className, "text-[16px] ")}>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
