"use client";
import React from "react";
import Image from "next/image";
import { Bookmark, Share, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";
const roboto = Roboto_Mono({ subsets: ["latin"] });
function ImageHeader(props: any) {
  const item = props.item;
  const loading = props.loading;
  return (
    <div className=" w-full h-full flex-col items-center ">
      {item.backdrop_path || item.poster_path ? (
        <div className="w-full pt-5 pr-5 pb-8 h-full">
          <Image
            className="rounded-[30px]  object-cover w-full h-full"
            src={`https://image.tmdb.org/t/p/original${
              item.backdrop_path === null
                ? item.poster_path
                : item.backdrop_path
            }`}
            alt={item.title || item.name}
            width={1920}
            height={1080}
          />
        </div>
      ) : (
        <div className="w-full h-[750px] p-2 flex items-center justify-center">
          <p>No image available</p>
        </div>
      )}

      <div className="absolute bottom-2 left-[13%] flex flex-col items-center bg-[#000000] border-[15px] border-[#1B1919] min-w-[350px] pt-2 pb-3 rounded-[40px]">
        {/* <div className="w-[50px] h-[50px] absolute bottom-[13px] left-[-63px] rounded-br-[50px] shadow-[70px_70px_0px_70px_#1B1919] z-[-1]"></div>
        <div className="w-[50px] h-[50px] bottom-[13px] absolute left-[315px] text-white bg-white  rounded-bl-[50px] shadow-[-70px_70px_0px_70px_#1B1919] z-[-1]"></div> */}
        <h1 className="font-bold ml-2 relative translate-y-2 truncate text-[25px] max-w-[250px]">
          {item.title || item.name}
        </h1>

        <p
          className={cn(
            roboto.className,
            "transform -rotate-[-90deg] text-[18px] translate-x-[-140px]"
          )}
        >
          {item.name ? "Show" : "Movie"}
        </p>
        <div className="flex ml-7 flex-row space-x-2 items-center">
          <Link
            className={cn(
              roboto.className,
              "p-1 bg-[#FFD700] rounded-[5px] flex"
            )}
            href={`/watch?id=${item.id}&type=${item.name ? "tv" : "movie"}`}
          >
            Watch
            <Play className="w-5 fill-[#000000]" />
          </Link>
          <Link className="p-1 bg-[#FFD700] rounded-[5px] flex" href="">
            Trailer
            <Play className="w-5 fill-[#000000]" />
          </Link>
          <Bookmark className="w-5 h-5 text-[#4C5E77]" />
          <Share className="w-5 h-5 text-[#4C5E77]" />
        </div>
      </div>

      <div className="absolute bottom-[2%] bg-[#000000] border-[10px]  border-[#1B1919]  left-[4%] max-h-[270px] max-w-[170px] rounded-[20px]">
        <Image
          className="object-cover rounded-[20px]   w-full h-full"
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          width={1920}
          height={1080}
          alt={item.title || item.name}
        />
      </div>
      <div className="absolute bottom-[22%] left-[11%] bg-[#000000] border-[10px] border-[#1B1919] rounded-[50%]">
        <h1 className="font-bold text-[15px] p-2">5.5</h1>
      </div>
    </div>
  );
}

export default ImageHeader;
