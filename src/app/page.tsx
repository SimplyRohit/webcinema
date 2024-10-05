"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Roboto_Mono } from "next/font/google";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import axios from "axios";
import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";
import ImageHeader from "@/components/Mainpage/ImageHeader";

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

  const [sliderRef, slider] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 600px)": {
        slides: { perView: 6, spacing: 15 },
      },
      "(min-width: 800px)": {
        slides: { perView: 8, spacing: 15 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 10, spacing: 15 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 10, spacing: 15 },
      },
    },
    slides: {
      perView: 10,
      spacing: 15,
    },
  });

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
    <div className="w-full h-full md:pb-2  overflow-hidden md:pl-[70px]">
      <ImageHeader />
      {loading
        ? maindata.map((item, idx) => (
            <div key={idx} className="pl-1 w-full h-full">
              <div className="md:pb-[40px] md:pt-[40px]">
                <div className="flex flex-row items-center justify-between">
                  <h1 className={cn("  text-[25px] pb-3")}>{item.name}</h1>
                  <div className="flex flex-row items-center pr-2 justify-center">
                    <ChevronLeft className="text-[#A4B3C9] w-5 h-5" />
                    <p
                      className={cn(
                        roboto.className,
                        "text-[#A4B3C9] text-[12px]"
                      )}
                    >
                      swipe
                    </p>
                    <ChevronRight className="text-[#A4B3C9] w-5 h-5" />
                  </div>
                </div>
                <div className="keen-slider overflow-x-auto md:h-[270px] h-[100px]">
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
            </div>
          ))
        : moviesData.map((item, idx) => (
            <div key={idx} className="pl-1  w-full h-full">
              <div className="md:pb-[40px] pt-[20px] md:pt-[40px]">
                <div className="flex flex-row items-center justify-between">
                  <h1 className={cn(" text-[20px] md:text-[25px] pb-3")}>
                    {item.name}
                  </h1>
                  <div className="flex flex-row items-center pr-2 justify-center">
                    <ChevronLeft className="text-[#A4B3C9] w-5 h-5" />
                    <p
                      className={cn(
                        roboto.className,
                        "text-[#A4B3C9] text-[12px]"
                      )}
                    >
                      swipe
                    </p>
                    <ChevronRight className="text-[#A4B3C9] w-5 h-5" />
                  </div>
                </div>
                <div
                  ref={sliderRef}
                  className="keen-slider overflow-x-auto   md:h-[270px] h-[180px] "
                >
                  {item.data.map((movie: any) => (
                    <div
                      onClick={() =>
                        router.push(
                          `/details?id=${movie.id}&type=${
                            movie.name ? "tv" : "movie"
                          }`
                        )
                      }
                      key={movie.id}
                      className="keen-slider__slide md:!min-w-[180px] !min-w-[90px]   "
                    >
                      <Image
                        className="object-cover md:h-[250px] h-[150px] rounded"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.name || movie.title}
                        width={200}
                        height={200}
                        unoptimized
                      />
                      <p className={cn(roboto.className, "truncate")}>
                        {movie.name || movie.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
