"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { db } from "@/DB/db";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/libs/utils";

const roboto = Roboto_Mono({ subsets: ["latin"] });
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [ref] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 9,
      spacing: 15,
    },
  });

  return (
    <div ref={ref} className="keen-slider  overflow-x-auto h-[270px] ">
      {db.map((item) => (
        <div key={item.name} className="keen-slider__slide !min-w-[200px]">
          <Image
            className="object-cover    h-[250px] rounded"
            src={item.url}
            alt={item.name}
            width={1920}
            height={1080}
          ></Image>
          <p className={cn(roboto.className, "text-[16px] ")}>{item.name}</p>
        </div>
      ))}
      {/* {loaded && ref.current && (
        <>
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || ref.current?.prev()}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e) => e.stopPropagation() || ref.current?.next()}
            disabled={
              currentSlide === ref.current.track.details.slides.length - 1
            }
          />
        </>
      )} */}
    </div>
  );
}

// function Arrow(props: any) {
//   const disabled = props.disabled ? "fill-[ffffff80]" : "";
//   return (
//     <svg
//       onClick={props.onClick}
//       className={`w-[30px] h-[30px] absolute top-[50%] translate-y-[-50%] fill-white cursor-pointer ${
//         props.left ? "left-[5px]" : "left-auto right-[5px]"
//       } ${disabled}`}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//     >
//       {props.left && (
//         <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
//       )}
//       {!props.left && (
//         <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
//       )}
//     </svg>
//   );
// }
