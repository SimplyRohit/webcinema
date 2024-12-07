"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Bookmark, Share, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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

  const currentItem = useMemo(
    () => items[currentIndex] || {},
    [items, currentIndex],
  );

  useEffect(() => {
    const cookies = nookies.get();
    const watchlist = cookies.watchlist ? JSON.parse(cookies.watchlist) : [];
    setIsInWatchlist(
      watchlist.some((content: any) => content.id === currentItem.id),
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
      <div className="z-[-2] h-full w-full p-2">
        {loading ? (
          <div className="shimmer h-[400px] w-full rounded-[30px] md:h-[calc(100vh-150px)]"></div>
        ) : (
          currentItem.backdrop_path && (
            <Image
              className={cn(
                "h-[400px] w-full rounded-[30px] object-cover md:h-[calc(100vh-150px)]",
                currentIndex % 2 === 0
                  ? "animate-slideInLeft"
                  : "animate-slideInRight",
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

      <div className="absolute bottom-[-1rem] left-[0px] flex w-[270px] flex-col items-center rounded-[40px] border-[15px] border-[#1B1919] bg-[#000000] p-1 pb-3 pt-2 md:bottom-[-20px] md:left-[36%] md:min-w-[350px]">
        <h1 className="relative ml-2 max-w-[150px] translate-y-2 truncate pl-1 text-[20px] font-bold md:max-w-[250px] md:text-[25px]">
          {loading ? (
            <>Loading...</>
          ) : (
            <>{currentItem.title || currentItem.name}</>
          )}
        </h1>

        <p
          className={cn(
            roboto.className,
            "translate-x-[-90px] -rotate-[-90deg] transform text-[15px] md:translate-x-[-140px] md:text-[18px]",
          )}
        >
          {loading ? <>Movie</> : <>{currentItem.name ? "Show" : "Movie"}</>}
        </p>
        <div className="ml-7 flex flex-row items-center space-x-2">
          <Link
            className={cn(
              roboto.className,
              "flex items-center rounded-[5px] bg-[#FFD700] p-1 px-1 text-[12px] md:text-[15px]",
            )}
            href={`/watch?id=${currentItem.id}&type=${
              currentItem.name ? "tv&season=1&episode=1" : "movie"
            }`}
          >
            Watch
            <Play className="h-3 w-3 fill-[#000000] md:h-4 md:w-5" />
          </Link>

          <Link
            className="rounded-[5px] bg-[#FFD700] p-1 text-[12px] md:text-[14px]"
            href={`/details?id=${currentItem.id}&type=${
              currentItem.name ? "tv" : "movie"
            }`}
          >
            Details
          </Link>

          <div className="group relative inline-block">
            <Bookmark
              onClick={toggleWatchlist}
              className={cn(
                isInWatchlist ? "fill-[#FFD700]" : "",
                "h-4 w-4 text-[#4C5E77] group-hover:text-[#FFD700] md:h-5 md:w-5",
              )}
            />
            <span
              className={cn(
                isInWatchlist ? "w-[12rem]" : "w-[10rem]",
                roboto.className,
                "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded bg-[#4d4747] bg-opacity-40 px-4 py-1 text-[.9rem] tracking-[-.075em] text-[#b8c2cf] opacity-0 transition-opacity duration-300 md:group-hover:opacity-100",
              )}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </span>
          </div>

          <div className="group relative inline-block">
            <Share
              onClick={handleShareClick}
              className="h-4 w-4 text-[#4C5E77] group-hover:text-[#FFD700] md:h-5 md:w-5"
            />
            <span
              className={cn(
                roboto.className,
                "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded bg-[#4d4747] bg-opacity-40 px-4 py-2 text-[.9rem] tracking-[-.075em] text-[#b8c2cf] opacity-0 transition-opacity duration-300 md:group-hover:opacity-100",
              )}
            >
              Share
            </span>
          </div>
        </div>

        {copyMessage && (
          <div className="absolute bottom-[-40px] text-sm text-white">
            {copyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
