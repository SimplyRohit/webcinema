"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bookmark, Share, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import nookies from "nookies";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function ImageHeader() {
  const [items, setItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/mainpage/image`);
        setItems(response.data.results.slice(0, 6));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex] || {};

  useEffect(() => {
    const cookies = nookies.get();
    const watchlist = cookies.watchlist ? JSON.parse(cookies.watchlist) : [];
    setIsInWatchlist(
      watchlist.some((content: any) => content.id === currentItem.id)
    );
  }, [currentItem]);

  const toggleWatchlist = () => {
    const cookies = nookies.get();
    const watchlist = cookies.watchlist ? JSON.parse(cookies.watchlist) : [];
    const updatedWatchlist = isInWatchlist
      ? watchlist.filter((content: any) => content.id !== currentItem.id)
      : [
          ...watchlist,
          { id: currentItem.id, type: currentItem.name ? "tv" : "movie" },
        ];
    nookies.set(null, "watchlist", JSON.stringify(updatedWatchlist), {
      path: "/",
    });

    setIsInWatchlist(!isInWatchlist);
  };

  const handleShareClick = () => {
    const path = `webcinema.vercel.app/details?id=${currentItem.id}&type=${
      currentItem.name ? "tv" : "movie"
    }`;

    navigator.clipboard
      .writeText(path)
      .then(() => {
        setCopyMessage("Copied!");
        setTimeout(() => setCopyMessage(""), 2000);
      })
      .catch(() => {
        setCopyMessage("Failed to copy");
      });
  };

  return (
    <div className="relative flex flex-1 flex-col items-center">
      <div className="w-full z-[-2] h-full p-2">
        {loading ? (
          <div className="md:rounded-[30px] shimmer h-[750px]"></div>
        ) : (
          currentItem.backdrop_path && (
            <Image
              className={cn(
                "rounded-[30px] object-cover w-full md:h-[750px] h-[400px]",
                currentIndex % 2 === 0
                  ? "animate-slideInLeft"
                  : "animate-slideInRight"
              )}
              src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`}
              alt={currentItem.title || currentItem.name}
              width={1080}
              height={1080}
              unoptimized
            />
          )
        )}
      </div>

      <div className="absolute md:bottom-[-20px] bottom-[-1rem] left-[0px] md:left-[36%] flex flex-col items-center bg-[#000000] border-[15px] border-[#1B1919] w-[270px] md:min-w-[350px] pt-2 pb-3 p-1 rounded-[40px]">
        <h1 className="font-bold pl-1 ml-2 relative translate-y-2 truncate text-[20px] md:text-[25px] max-w-[150px] md:max-w-[250px]">
          {loading ? (
            <>Loading...</>
          ) : (
            <>{currentItem.title || currentItem.name}</>
          )}
        </h1>

        <p
          className={cn(
            roboto.className,
            "transform -rotate-[-90deg] md:text-[18px] text-[15px] translate-x-[-90px] md:translate-x-[-140px]"
          )}
        >
          {loading ? <>Movie</> : <>{currentItem.name ? "Show" : "Movie"}</>}
        </p>
        <div className="flex ml-7 flex-row space-x-2 items-center">
          <Link
            className={cn(
              roboto.className,
              "p-1 px-1 bg-[#FFD700] items-center text-[12px] md:text-[15px] rounded-[5px] flex"
            )}
            href={`/watch?id=${currentItem.id}&type=${
              currentItem.name ? "tv&season=1&episode=1" : "movie"
            }`}
          >
            Watch
            <Play className="md:w-5 md:h-4 w-3 h-3 fill-[#000000]" />
          </Link>

          <Link
            className="p-1 bg-[#FFD700] text-[12px] md:text-[14px] rounded-[5px]"
            href={`/details?id=${currentItem.id}&type=${
              currentItem.name ? "tv" : "movie"
            }`}
          >
            Details
          </Link>

          <div className="relative inline-block group">
            <Bookmark
              onClick={toggleWatchlist}
              className={cn(
                isInWatchlist ? "fill-[#FFD700]" : "",
                "md:w-5 w-4 h-4 md:h-5 text-[#4C5E77] group-hover:text-[#FFD700]"
              )}
            />
            <span
              className={cn(
                isInWatchlist ? "w-[12rem]" : "w-[10rem]",
                roboto.className,
                " absolute bg-[#4d4747] px-4 py-1 bg-opacity-40 rounded text-[#b8c2cf] text-[.9rem] tracking-[-.075em] bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              )}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </span>
          </div>

          <div className="relative inline-block group">
            <Share
              onClick={handleShareClick}
              className="md:w-5 md:h-5 w-4 h-4 text-[#4C5E77] group-hover:text-[#FFD700]"
            />
            <span
              className={cn(
                roboto.className,
                "absolute bg-[#4d4747] px-4 py-2 bg-opacity-40 rounded text-[#b8c2cf] text-[.9rem] tracking-[-.075em] bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              )}
            >
              Share
            </span>
          </div>
        </div>

        {copyMessage && (
          <div className="absolute bottom-[-40px] text-white text-sm">
            {copyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
