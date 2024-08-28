"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bookmark, Share, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";
import axios from "axios";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function ImageHeader() {
  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const popularMovie = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=21adfad015207a4c85a59b73ff60ddec&language=en-US&page=1"
      );
      const popularTVShow = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=21adfad015207a4c85a59b73ff60ddec&language=en-US&page=1"
      );
      const kdramaMovie = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=21adfad015207a4c85a59b73ff60ddec&with_genres=18&with_keywords=210024&page=1"
      );
      const kdramaTVShow = await axios.get(
        "https://api.themoviedb.org/3/discover/tv?api_key=21adfad015207a4c85a59b73ff60ddec&with_genres=18&with_keywords=210024&page=1"
      );
      const animeMovie = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=21adfad015207a4c85a59b73ff60ddec&with_genres=16&page=1"
      );
      const animeTVShow = await axios.get(
        "https://api.themoviedb.org/3/discover/tv?api_key=21adfad015207a4c85a59b73ff60ddec&with_genres=16&page=1"
      );

      const combinedItems = [
        popularMovie.data.results[0],
        popularTVShow.data.results[0],
        kdramaMovie.data.results[0],
        kdramaTVShow.data.results[0],
        animeMovie.data.results[0],
        animeTVShow.data.results[0],
      ];

      setItems(combinedItems);
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return <p>Loading...</p>;

  const currentItem = items[currentIndex];

  return (
    <div className="relative flex flex-1 flex-col items-center">
      <div className="w-full z-[-2] h-full p-2">
        <Image
          className="rounded-[30px] object-cover h-[750px]"
          src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`}
          alt={currentItem.title || currentItem.name}
          width={1920}
          height={1080}
        />
      </div>

      <div className="absolute bottom-[-20px] left-[36%] flex flex-col items-center bg-[#000000] border-[15px] border-[#1B1919] p-5 rounded-[40px]">
        <div className="w-[50px] h-[50px] absolute bottom-[13px] left-[-63px] rounded-br-[50px] shadow-[70px_70px_0px_70px_#1B1919] z-[-1]"></div>
        <div className="w-[50px] h-[50px] bottom-[13px] absolute left-[315px] rounded-bl-[50px] shadow-[-70px_70px_0px_70px_#1B1919] z-[-1]"></div>

        <h1 className="font-bold truncate text-[25px]  pb-2">
          {currentItem.title || currentItem.name}
        </h1>
        <div className="flex flex-row space-x-2 items-center justify-center">
          <p
            className={cn(
              roboto.className,
              "transfor -rotate-[-90deg] text-[18px] origin-[60%_-10%]"
            )}
          >
            {currentItem.media_type === "movie" ? "Movie" : "TV Show"}
          </p>
          <Link
            className={cn(
              roboto.className,
              "p-1 bg-[#FFD700] rounded-[5px] flex"
            )}
            href=""
          >
            Watch
            <Play className="w-5 fill-[#000000]" />
          </Link>
          <Link className="p-1 bg-[#FFD700] rounded-[5px]" href="">
            Details
          </Link>
          <Bookmark className="w-5 h-5 text-[#4C5E77]" />
          <Share className="w-5 h-5 text-[#4C5E77]" />
        </div>
      </div>
    </div>
  );
}
