"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Bookmark, Share, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({ subsets: ["latin"] });

function ImageHeader(props: any) {
  const { item, loading } = props;
  const [DIV, setDIV] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("" as any);
  const [trailer, setTrailer] = useState(false);
  useEffect(() => {
    if (!loading && item) {
      const fetchVideos = async () => {
        try {
          setTrailer(true);
          const response = await fetch(
            `https://api.themoviedb.org/3/${item.name ? "tv" : "movie"}/${
              item.id
            }/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const trial = await response.json();

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

  return (
    <div className="flex   w-full h-full   md:w-[81vw] md:ml-[5rem]">
      <Image
        className={cn(
          loading ? "shimmer" : "",
          "md:rounded-[1.875rem] rounded-lg   animate-slideInLeft object-cover w-full  md:w-full h-[34rem] md:h-[60rem]   mb-[1rem] pt-[1rem] px-[0.5rem] md:px-[0.5rem]  z-[-2] md:pr-[1rem]  md:pb-[0rem]"
        )}
        src={
          loading
            ? ""
            : `https://image.tmdb.org/t/p/original${
                item.backdrop_path ? item.backdrop_path : item.poster_path
              }`
        }
        alt={loading ? "" : item.title || item.name}
        width={1080}
        height={1080}
        unoptimized
      />

      <div className="absolute  md:top-[46rem]  top-[24.2rem] md:left-[5rem] ">
        {DIV && (
          <>
            <div className="w-[20px] md:w-[25px] md:h-[25px] h-[20px] md:bottom-[7.9rem] absolute md:left-[9.45rem] left-[.5rem] bottom-[10.4rem] rounded-bl-[50px] shadow-[-20px_20px_0px_20px_#1B1919] z-[-1]"></div>
            <div className="w-[20px] h-[20px] md:bottom-[0.2rem] absolute md:left-[30rem] left-[21.5rem] bottom-[.5rem] rotate-[2deg] rounded-bl-[50px] shadow-[-10px_10px_0px_10px_#1B1919] z-[-1]"></div>
            <div className="w-[20px] h-[20px] md:bottom-[0.2rem] absolute md:left-[10rem]  rotate-[2deg] rounded-bl-[50px] sm:shadow-[-10px_10px_0px_10px_#1B1919] z-[-1]"></div>
            <div className="w-[15px] h-[15px] md:bottom-[12.5rem]  absolute md:left-[6.2rem] left-[5rem] bottom-[8.8rem] rotate-[180deg] rounded-bl-[50px] shadow-[-5px_5px_0px_5px_#1B1919] "></div>
            <div className="w-[15px] h-[15px] md:bottom-[10.2rem] absolute md:left-[7.9rem] left-[6.6rem] bottom-[6.5rem] rotate-[190deg] rounded-bl-[50px] shadow-[-5px_5px_0px_5px_#1B1919] "></div>
            <div className="w-[30px] h-[30px] md:bottom-[14rem] absolute md:left-[.5rem] left-[9.2rem] bottom-[7.2rem] md:rotate-[0deg] rotate-[0deg] rounded-bl-[50px] md:shadow-[-10px_10px_0px_10px_#1B1919] md:z-[-1] shadow-[-10px_10px_0px_10px_#1B1919] "></div>
          </>
        )}
        <Image
          className={cn(
            "object-cover border-[10px] md:w-[150px] md:h-[225px] rounded-[1.25rem] w-[130px] h-[165px] border-[#1B1919]"
          )}
          src={
            loading ? "" : `https://image.tmdb.org/t/p/w500${item.poster_path}`
          }
          width={200}
          height={200}
          alt={loading ? "" : item.title || item.name}
          unoptimized
        />

        {!loading && (
          <div className="absolute top-[-10px] right-[-20px] bg-[#000000] border-[8px] border-[#1B1919] rounded-[50%]">
            <h1 className="text-[#FFD700] font-bold text-[1.125rem] p-[0.5rem] px-[.7rem]">
              {item.vote_average.toFixed(1)}
            </h1>
          </div>
        )}

        <div className="absolute md:bottom-[-0.3rem] bottom-[-0.1rem] left-[7.5rem] md:left-[9rem] flex flex-col items-center bg-[#000000] border-[10px] border-[#1B1919] w-[14rem] md:min-w-[21rem] p-[.5rem] rounded-[1.25rem] md:rounded-[2.5rem]">
          <h1 className="font-bold pl-1 ml-2 relative translate-y-2 truncate text-[20px] md:text-[25px] max-w-[150px] md:max-w-[250px]">
            {loading ? <>Loading...</> : <>{item.title || item.name}</>}
          </h1>

          <p
            className={cn(
              roboto.className,
              "transform -rotate-[-90deg] md:text-[18px] text-[15px] translate-x-[-90px] md:translate-x-[-140px]"
            )}
          >
            {loading ? <>Movie</> : <>{item.name ? "Show" : "Movie"}</>}
          </p>
          <div className="flex ml-7 flex-row space-x-2 items-center">
            <Link
              className={cn(
                roboto.className,
                "p-1 px-1 bg-[#FFD700] items-center text-[14px] md:text-[15px] rounded-[5px] flex"
              )}
              href={`/watch?id=${item.id}&type=${
                item.name ? "tv&season=1&episode=1" : "movie"
              }`}
            >
              Watch
              <Play className="md:w-5 md:h-4 w-3 h-3 fill-[#000000]" />
            </Link>

            <Link
              className="p-1 px-1 bg-[#FFD700] items-center text-[14px] md:text-[15px] rounded-[5px] flex"
              href={trailer ? "" : trailerUrl}
              target="_blank"
            >
              Trailer
              <Play className="md:w-5 md:h-4 w-3 h-3 fill-[#000000]" />
            </Link>

            <Bookmark className="md:w-5 w-4 h-4 md:h-5 text-[#4C5E77]" />
            <Share className="md:w-5 md:h-5 w-4 h-4 text-[#4C5E77]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageHeader;
