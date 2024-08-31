"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bookmark, Share, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function ImageHeader() {
  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/all/day?api_key=21adfad015207a4c85a59b73ff60ddec&language=en-US&page=1"
        );

        setItems(response.data.results.slice(0, 6));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex] || {};

  return (
    <div className="relative flex flex-1 flex-col items-center">
      <div className="w-full z-[-2] h-full p-2">
        {loading ? (
          <div className="sm:rounded-[30px] shimmer h-[750px]"></div>
        ) : (
          currentItem.backdrop_path && (
            <Image
              className="sm:rounded-[30px] rounded-lg object-cover sm:h-[750px] h-[400px]"
              src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`}
              alt={currentItem.title || currentItem.name}
              width={1920}
              height={1080}
            />
          )
        )}
      </div>

      <div className="absolute sm:bottom-[-20px] bottom-0 left-[0px] sm:left-[36%] flex flex-col items-center bg-[#000000] border-[5px] sm:border-[15px] border-[#1B1919] min-w-[120px] sm:min-w-[350px] sm:pt-2 sm:pb-3 p-1 rounded-[20px] sm:rounded-[40px]">
        <div className="w-[50px]  h-[50px] absolute bottom-[13px] left-[-63px] rounded-br-[50px] sm:shadow-[70px_70px_0px_70px_#1B1919] z-[-1]"></div>
        <div className="w-[50px] h-[50px] bottom-[13px] absolute left-[315px] rounded-bl-[50px] sm:shadow-[-70px_70px_0px_70px_#1B1919] z-[-1]"></div>

        <h1 className="font-bold pl-1 ml-2 relative translate-y-2 truncate text-[20px] sm:text-[25px] max-w-[150px] sm:max-w-[250px]">
          {loading ? (
            <>Loading...</>
          ) : (
            <>{currentItem.title || currentItem.name}</>
          )}
        </h1>

        <p
          className={cn(
            roboto.className,
            "transform -rotate-[-90deg] sm:text-[18px] text-[15px] translate-x-[-80px] sm:translate-x-[-140px]"
          )}
        >
          {loading ? <>Movie</> : <>{currentItem.name ? "Show" : "Movie"}</>}
        </p>
        <div className="flex ml-7 flex-row space-x-2 items-center">
          <Link
            className={cn(
              roboto.className,
              "sm:p-1 px-1 sm:px-1 bg-[#FFD700] items-center text-[12px] sm:text-[15px] rounded-[5px] flex"
            )}
            href={`/watch?id=${currentItem.id}&type=${
              currentItem.name ? "tv&season=1&episode=1" : "movie"
            }`}
          >
            Watch
            <Play className="sm:w-5 sm:h-4 w-3 h-3 fill-[#000000]" />
          </Link>
          <Link
            className="sm:p-1.5  bg-[#FFD700] text-[12px] sm:text-[14px] rounded-[5px]"
            href={`/details?id=${currentItem.id}&type=${
              currentItem.name ? "tv" : "movie"
            }`}
          >
            Details
          </Link>
          <Bookmark className="sm:w-5 w-4 h-4  sm:h-5 text-[#4C5E77]" />
          <Share className="sm:w-5 sm:h-5 w-4 h-4  text-[#4C5E77]" />
        </div>
      </div>
    </div>
  );
}
