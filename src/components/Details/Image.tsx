"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bookmark, Share, Play, Divide } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Roboto_Mono } from "next/font/google";
import nookies from "nookies";
import axios from "axios";
const roboto = Roboto_Mono({ subsets: ["latin"] });
function ImageHeader(props: any) {
  const { item, loading } = props;
  const [DIV, setDIV] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("" as any);
  const [trailer, setTrailer] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  useEffect(() => {
    if (!loading && item) {
      const fetchVideos = async () => {
        const id = item.id;
        try {
          setTrailer(true);
          const response = await axios.post(`api/details/image`, { id });
          const trial = response.data;

          if (trial.results.length > 0) {
            const lastVideo = trial.results[trial.results.length - 1];
            setTrailerUrl(`https://www.youtube.com/watch?v=${lastVideo.key}`);
          }

          setTrailer(false);
        } catch (error) {}
      };

      fetchVideos();
    }
  }, [loading, item]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setDIV(true), 1000);
    }
  }, [loading]);

  useEffect(() => {
    const cookies = nookies.get();
    const watchlist = cookies.watchlist ? JSON.parse(cookies.watchlist) : [];
    setIsInWatchlist(watchlist.some((content: any) => content.id === item.id));
  }, [item]);

  const toggleWatchlist = () => {
    const cookies = nookies.get();

    const watchlist = cookies.watchlist ? JSON.parse(cookies.watchlist) : [];
    const updatedWatchlist = isInWatchlist
      ? watchlist.filter((content: any) => content.id !== item.id)
      : [...watchlist, { id: item.id, type: item.name ? "tv" : "movie" }];
    nookies.set(null, "watchlist", JSON.stringify(updatedWatchlist), {
      path: "/",
    });

    setIsInWatchlist(!isInWatchlist);
  };

  const handleShareClick = () => {
    const link = `https://webcinema.vercel.app/details?id=${item.id}&type=${
      item.name ? "tv" : "movie"
    }`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopyMessage("Copied!");
        setTimeout(() => setCopyMessage(""), 2000);
      })
      .catch(() => {
        setCopyMessage("Failed to copy");
      });
  };
  return (
    <div className="relative flex h-full w-full md:ml-[5rem]">
      {loading ? (
        <div className="animate-slideInLeft shimmer z-[-2] mb-[1rem] h-[34rem] w-full rounded-lg px-[0.5rem] pt-[1rem] md:h-[99%] md:w-full md:rounded-[1.875rem] md:px-[0.5rem] md:pb-[0rem] md:pr-[1rem]"></div>
      ) : (
        <Image
          className={cn(
            "animate-slideInLeft z-[-2] mb-[1rem] h-[34rem] w-full rounded-lg object-cover px-[0.5rem] pt-[1rem] md:h-[99%] md:w-full md:rounded-[1.875rem] md:px-[0.5rem] md:pb-[0rem] md:pr-[1rem]",
          )}
          src={`https://image.tmdb.org/t/p/original${
            item.backdrop_path ? item.backdrop_path : item.poster_path
          }`}
          alt={item.title || item.name}
          width={1080}
          height={1080}
          unoptimized
        />
      )}

      {DIV && (
        <>
          <div className="absolute bottom-[10.3rem] left-[.5rem] z-[-1] h-[20px] w-[20px] rounded-bl-[50px] shadow-[-20px_20px_0px_20px_#1B1919] md:bottom-[8rem] md:left-[9.2rem] md:h-[25px] md:w-[25px]"></div>
          <div className="absolute bottom-[1rem] left-[21.5rem] z-[-1] h-[20px] w-[20px] rotate-[2deg] rounded-bl-[50px] shadow-[-10px_10px_0px_10px_#1B1919] md:bottom-[.3rem] md:left-[29.7rem]"></div>
          <div className="absolute h-[20px] w-[20px] rotate-[2deg] rounded-bl-[50px] sm:shadow-[-10px_10px_0px_10px_#1B1919] md:bottom-[1.2rem] md:left-[9rem] md:z-[-1]"></div>
          {/* <div className="w-[15px] h-[15px] md:bottom-[12.5rem]  absolute md:left-[6rem] left-[5rem] bottom-[8.8rem] rotate-[180deg] rounded-bl-[50px] shadow-[-5px_5px_0px_5px_#1B1919] "></div>
            <div className="w-[15px] h-[15px] md:bottom-[10.2rem] absolute md:left-[7.9rem] left-[6.6rem] bottom-[6.5rem] rotate-[190deg] rounded-bl-[50px] shadow-[-5px_5px_0px_5px_#1B1919]md:z-[-1] "></div> */}
          <div className="absolute bottom-[6.5rem] left-[9rem] h-[30px] w-[30px] rotate-[0deg] rounded-bl-[50px] shadow-[-10px_10px_0px_10px_#1B1919] md:bottom-[14rem] md:left-[0.5rem] md:z-[-1] md:rotate-[0deg] md:shadow-[-10px_10px_0px_10px_#1B1919]"></div>
        </>
      )}

      {loading ? (
        <div className="shimmer absolute bottom-[0rem] left-[0rem] h-[165px] w-[130px] rounded-[1.25rem] border-[10px] border-[#1B1919] object-cover md:bottom-[0rem] md:left-[0rem] md:h-[225px] md:w-[150px]"></div>
      ) : (
        <Image
          className={cn(
            "absolute bottom-[0rem] left-[0rem] h-[165px] w-[130px] rounded-[1.25rem] border-[10px] border-[#1B1919] object-cover md:bottom-[0rem] md:left-[0rem] md:h-[225px] md:w-[150px]",
          )}
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          width={200}
          height={200}
          alt={item.title || item.name}
          unoptimized
        />
      )}

      <div className="absolute bottom-[8rem] left-[6.8rem] rounded-[50%] border-[8px] border-[#1B1919] bg-[#000000] md:bottom-[11.5rem] md:left-[8rem]">
        <h1 className="p-[0.5rem] px-[.7rem] text-[1.125rem] font-bold text-[#FFD700]">
          {loading ? "" : item.vote_average.toFixed(1)}
        </h1>
      </div>

      <div className="absolute bottom-[0rem] left-[7.5rem] flex w-[14rem] flex-col items-center rounded-[1.25rem] border-[10px] border-[#1B1919] bg-[#000000] p-[.5rem] md:bottom-[0rem] md:left-[9rem] md:min-w-[21rem] md:rounded-[2.5rem]">
        <h1 className="relative ml-2 max-w-[150px] translate-y-2 truncate pl-1 text-[20px] font-bold md:max-w-[250px] md:text-[25px]">
          {loading ? <>Loading...</> : <>{item.title || item.name}</>}
        </h1>

        <p
          className={cn(
            roboto.className,
            "translate-x-[-90px] -rotate-[-90deg] transform text-[15px] md:translate-x-[-140px] md:text-[18px]",
          )}
        >
          {loading ? <>Movie</> : <>{item.name ? "Show" : "Movie"}</>}
        </p>
        <div className="ml-7 flex flex-row items-center space-x-2">
          <Link
            className={cn(
              roboto.className,
              "flex items-center rounded-[5px] bg-[#FFD700] p-1 px-1 text-[14px] md:text-[15px]",
            )}
            href={`/watch?id=${item.id}&type=${
              item.name ? "tv&season=1&episode=1" : "movie"
            }`}
          >
            Watch
            <Play className="h-3 w-3 fill-[#000000] md:h-4 md:w-5" />
          </Link>

          <Link
            className="flex items-center rounded-[5px] bg-[#FFD700] p-1 px-1 text-[14px] md:text-[15px]"
            href={trailer ? "" : trailerUrl}
            target="_blank"
          >
            Trailer
            <Play className="h-3 w-3 fill-[#000000] md:h-4 md:w-5" />
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
              {copyMessage ? "Copied" : "Share"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageHeader;
