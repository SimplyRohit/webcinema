"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Roboto_Mono } from "next/font/google";
import Image from "next/image";
import axios from "axios";
import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";
import ImageHeader from "@/components/Mainpage/ImageHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const roboto = Roboto_Mono({ subsets: ["latin"] });
const maindata = [
  {
    id: 0,
    name: "Recommendation",
  },
  {
    id: 1,
    name: "Latest Movies",
  },
  {
    id: 2,
    name: "Latest TV-Shows",
  },
  {
    id: 3,
    name: "K-Drama Movies",
  },
  {
    id: 4,
    name: "K-Drama Shows",
  },
  {
    id: 5,
    name: "Anime Movies",
  },
  {
    id: 6,
    name: "Anime Shows",
  },
];
export default function Homepage() {
  const router = useRouter();

  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await axios.get("api/mainpage/page");

        setMoviesData(allData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden md:pb-2 md:pl-[70px]">
      <ImageHeader />
      {loading
        ? maindata.map((item, idx) => (
            <Carousel key={idx} className="h-full w-full pl-1">
              <div className="md:pb-[40px] md:pt-[40px]">
                <div className="flex flex-row items-center justify-between">
                  <h1 className={cn("pb-3 text-[25px]")}>{item.name}</h1>
                  <div className="flex flex-row items-center justify-center pr-2">
                    <CarouselPrevious
                      className="!mx-2 !flex !w-4 !items-center !justify-center !rounded-[50%] !bg-[#A4B3C8]"
                      style={{
                        all: "unset",
                      }}
                    />
                    <p
                      className={cn(
                        roboto.className,
                        "text-[12px] text-[#A4B3C9]",
                      )}
                    >
                      swipe
                    </p>
                    <CarouselNext
                      className="!mx-2 !flex !w-4 !items-center !justify-center !rounded-[50%] !bg-[#A4B3C8]"
                      style={{
                        all: "unset",
                      }}
                    />
                  </div>
                </div>
                <div className="keen-slider h-[100px] overflow-x-auto md:h-[270px]">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <div
                      key={index}
                      className="keen-slider__slide shimmer !min-w-[200px]"
                    >
                      <p className={cn(roboto.className, "truncate")}></p>
                    </div>
                  ))}
                </div>
              </div>
            </Carousel>
          ))
        : moviesData.map((item, idx) => (
            <Carousel key={idx} className="h-full w-full pl-1 pt-10">
              <div className="flex flex-row items-center justify-between">
                <h1 className={cn("pb-3 text-[20px] md:text-[25px]")}>
                  {item.name}
                </h1>
                <div className="flex flex-row items-center justify-center pr-2">
                  <CarouselPrevious
                    className="!mx-2 !flex !w-4 !items-center !justify-center !rounded-[50%] !bg-[#A4B3C8]"
                    style={{
                      all: "unset",
                    }}
                  />
                  <p
                    className={cn(
                      roboto.className,
                      "text-[12px] text-[#A4B3C9]",
                    )}
                  >
                    swipe
                  </p>
                  <CarouselNext
                    className="!mx-2 !flex !w-4 !items-center !justify-center !rounded-[50%] !bg-[#A4B3C8]"
                    style={{
                      all: "unset",
                    }}
                  />
                </div>
              </div>
              <CarouselContent className="h-[180px] md:h-[290px]">
                {item.data.results.map((movie: any) => (
                  <CarouselItem
                    onClick={() =>
                      router.push(
                        `/details?id=${movie.id}&type=${
                          movie.name ? "tv" : "movie"
                        }`,
                      )
                    }
                    key={movie.id}
                    className="basis-1/10 w-[120px] md:w-[180px]"
                  >
                    <Image
                      className="h-[150px] rounded object-cover md:h-[250px]"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.name || movie.title}
                      width={200}
                      height={200}
                      unoptimized
                    />
                    <p className={cn(roboto.className, "truncate")}>
                      {movie.name || movie.title}
                    </p>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ))}
    </div>
  );
}
