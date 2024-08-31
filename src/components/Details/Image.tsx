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
    <div className=" w-full h-full flex-col  ">
      {loading ? (
        <div className="sm:w-full h-[500px] pt-2 px-2 sm:pt-5 sm:pr-5 pb-8 sm:h-full">
          <Image
            className="shimmer sm:rounded-[30px]  rounded-lg  object-cover w-full h-full"
            src={""}
            alt={""}
            width={1920}
            height={1080}
          />
        </div>
      ) : (
        <div className="sm:w-full h-[500px] pt-2 px-2 sm:pt-5 sm:pr-5 pb-8 sm:h-full">
          <Image
            className="sm:rounded-[30px] rounded-lg  object-cover w-full h-full"
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
      )}

      <div className="absolute sm:bottom-2 bottom-[44.5%] left-[30%] sm:left-[13%] flex flex-col items-center bg-[#000000]  border-[5px] sm:border-[15px] border-[#1B1919] min-w-[120px] sm:min-w-[350px]  p-1 rounded-[20px] sm:rounded-[40px]">
        {/* <div className="w-[50px] h-[50px] absolute bottom-[13px] left-[-63px] rounded-br-[50px] shadow-[70px_70px_0px_70px_#1B1919] z-[-1]"></div>
        <div className="w-[50px] h-[50px] bottom-[13px] absolute left-[315px] text-white bg-white  rounded-bl-[50px] shadow-[-70px_70px_0px_70px_#1B1919] z-[-1]"></div> */}
        <h1 className="font-bold ml-3 pl-1 relative translate-y-2 truncate text-[20px] sm:text-[25px] max-w-[200px]">
          {loading ? "Name" : item.title || item.name}
        </h1>

        <p
          className={cn(
            roboto.className,
            "transform -rotate-[-90deg] sm:text-[18px] text-[14px] translate-x-[-100px]  sm:translate-x-[-140px]"
          )}
        >
          {item.name ? "Show" : "Movie"}
        </p>
        <div className="flex ml-5  flex-row space-x-2 items-center">
          <Link
            className={cn(
              roboto.className,
              "sm:p-1 bg-[#FFD700] rounded-[5px] flex"
            )}
            href={`/watch?id=${item.id}&type=${item.name ? "tv" : "movie"}${
              item.name ? `&season=1&episode=1` : ""
            }`}
          >
            Watch
            <Play className="sm:w-5 w-4 fill-[#000000]" />
          </Link>
          <Link className="sm:p-1 bg-[#FFD700] rounded-[5px] flex" href="">
            Trailer
            <Play className="sm:w-5 w-4 fill-[#000000]" />
          </Link>
          <Bookmark className="sm:w-5 sm:h-5 w-4 h-4 text-[#4C5E77]" />
          <Share className="sm:w-5 sm:h-5 w-4 h-4 text-[#4C5E77]" />
        </div>
      </div>

      <div className="absolute sm:bottom-[2%] bottom-[44.5%] bg-[#000000] border-[5px] sm:border-[10px]  border-[#1B1919]  sm:left-[4%] sm:max-h-[270px] max-w-[120px] max-h-[250px] sm:max-w-[170px] rounded-[20px]">
        <Image
          className={cn("object-cover rounded-[20px]   w-full h-full")}
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          width={1920}
          height={1080}
          alt={item.title || item.name}
        />
      </div>
      {!loading && (
        <div className="absolute sm:bottom-[22%] bottom-[61%] left-[23%] sm:left-[11%] bg-[#000000] border-[2px] sm:border-[10px] border-[#1B1919] rounded-[50%]">
          <h1 className="font-bold text-[15px] p-2">{item.vote_average}</h1>
        </div>
      )}
    </div>
  );
}

export default ImageHeader;
