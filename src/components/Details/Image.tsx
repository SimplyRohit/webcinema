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
    <div className="flex w-full h-full md:w-[81vw] md:ml-[5rem]">
      {loading ? (
        <div className="md:w-full h-[35rem] shimmer pb-[0.5rem] pt-[0.5rem] px-[0.5rem] md:pt-[1rem] md:pr-[1rem] md:h-full md:pb-[2rem]">
          <Image
            className="md:rounded-[1.875rem] rounded-lg object-cover w-full h-full"
            src={""}
            alt={""}
            width={1920}
            height={1080}
          />
        </div>
      ) : (
        <div className="md:w-full h-[35rem] pb-[0.5rem] pt-[0.5rem] px-[0.5rem] md:pt-[1rem] md:pr-[1rem] md:h-full md:pb-[2rem]">
          <Image
            className="md:rounded-[1.875rem] rounded-lg object-cover w-full h-full"
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

      <div className="absolute md:top-[45.3rem] top-[24rem]  bg-[#000000] border-[5px] md:border-[10px] border-[#1B1919] md:left-[5rem] md:max-h-[16.875rem] max-w-[7.5rem] max-h-[15.625rem] md:max-w-[10.625rem] rounded-[1.25rem]">
        {loading ? (
          <div className="md:w-[150px] md:h-[225px] w-[110px] h-[165px] shimmer rounded-[1.25rem]">
            <Image
              className="object-cover rounded-[1.25rem] w-full h-full"
              src={""}
              width={1920}
              height={1080}
              alt={""}
            />
          </div>
        ) : (
          <Image
            className="object-cover rounded-[1.25rem] w-full h-full"
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            width={1920}
            height={1080}
            alt={item.title || item.name}
          />
        )}

        {!loading && (
          <div className="absolute top-[-20px] right-[-20px] bg-[#000000] border-[2px] md:border-[5px] border-[#1B1919] rounded-[50%]">
            <h1 className="font-bold text-[1.125rem] p-[0.5rem]">
              {item.vote_average.toFixed(1)}
            </h1>
          </div>
        )}

        <div className="absolute md:bottom-[-0.6rem] bottom-[-0.25rem] left-[100.5%] md:left-[100%] flex flex-col items-center bg-[#000000] border-[5px] md:border-[10px] border-[#1B1919] min-w-[7.5rem] md:min-w-[21rem] p-[.5rem] rounded-[1.25rem] md:rounded-[2.5rem]">
          <h1 className="font-bold pl-1 ml-2 relative translate-y-2 truncate text-[20px] md:text-[25px] max-w-[150px] md:max-w-[250px]">
            {loading ? <>Loading...</> : <>{item.title || item.name}</>}
          </h1>

          <p
            className={cn(
              roboto.className,
              "transform -rotate-[-90deg] md:text-[18px] text-[15px] translate-x-[-80px] md:translate-x-[-140px]"
            )}
          >
            {loading ? <>Movie</> : <>{item.name ? "Show" : "Movie"}</>}
          </p>
          <div className="flex ml-7 flex-row space-x-2 items-center">
            <Link
              className={cn(
                roboto.className,
                "md:p-1 px-1 md:px-1 bg-[#FFD700] items-center text-[12px] md:text-[15px] rounded-[5px] flex"
              )}
              href={`/watch?id=${item.id}&type=${
                item.name ? "tv&season=1&episode=1" : "movie"
              }`}
            >
              Watch
              <Play className="md:w-5 md:h-4 w-3 h-3 fill-[#000000]" />
            </Link>
            <Link
              className="md:p-1.5  bg-[#FFD700] text-[12px] md:text-[14px] rounded-[5px]"
              href={""}
            >
              trailer
            </Link>
            <Bookmark className="md:w-5 w-4 h-4  md:h-5 text-[#4C5E77]" />
            <Share className="md:w-5 md:h-5 w-4 h-4  text-[#4C5E77]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageHeader;
