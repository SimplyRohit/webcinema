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

export default function Homepage() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const router = useRouter();
  const maindata = [
    {
      id: 0,
      name: "Recommendation",
      url: "https://api.themoviedb.org/3/movie/157336/recommendations?api_key=21adfad015207a4c85a59b73ff60ddec&language=en-US&page=1",
    },
    {
      id: 1,
      name: "Latest Movies",
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=21adfad015207a4c85a59b73ff60ddec&page=1`,
    },
    {
      id: 2,
      name: "Latest TV-Shows",
      url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=21adfad015207a4c85a59b73ff60ddec&page=1`,
    },
    {
      id: 3,
      name: "K-Drama Movies",
      url: "https://api.themoviedb.org/3/discover/movie?api_key=21adfad015207a4c85a59b73ff60ddec&with_origin_country=KR&sort_by=popularity.descpage=1",
    },
    {
      id: 4,
      name: "K-Drama Shows",
      url: "https://api.themoviedb.org/3/discover/tv?api_key=21adfad015207a4c85a59b73ff60ddec&with_origin_country=KR&sort_by=popularity.descpage=1",
    },
    {
      id: 5,
      name: "Anime Movies",
      url: "https://api.themoviedb.org/3/discover/movie?api_key=21adfad015207a4c85a59b73ff60ddec&with_genres=16&sort_by=popularity.desc&page=1",
    },
    {
      id: 6,
      name: "Anime Shows",
      url: "https://api.themoviedb.org/3/discover/tv?api_key=21adfad015207a4c85a59b73ff60ddec&with_genres=16&sort_by=popularity.desc&page=1",
    },
  ];

  const [moviesData, setMoviesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

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
        const allData = await Promise.all(
          maindata.map(async (item) => {
            const response = await axios.get(item.url);
            return { name: item.name, data: response.data.results };
          })
        );
        setMoviesData(allData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [maindata]);

  return (
    <div className="w-full h-full sm:pb-2  overflow-hidden sm:pl-[70px]">
      <ImageHeader />
      {loading
        ? maindata.map((item, idx) => (
            <div key={idx} className="pl-1 w-full h-full">
              <div className="sm:pb-[40px] sm:pt-[40px]">
                <div className="flex flex-row items-center justify-between">
                  <h1 className={cn( "  text-[25px] pb-3")}>{item.name}</h1>
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
                <div className="keen-slider overflow-x-auto sm:h-[270px] h-[100px]">
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
              <div className="sm:pb-[40px] pt-[20px] sm:pt-[40px]">
                <div className="flex flex-row items-center justify-between">
                  <h1 className={cn(" text-[20px] sm:text-[25px] pb-3")}>
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
                  className="keen-slider overflow-x-auto   sm:h-[270px] h-[180px] "
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
                      className="keen-slider__slide sm:!min-w-[180px] !min-w-[90px]   "
                    >
                      <Image
                        className="object-cover sm:h-[250px] h-[150px] rounded"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.name || movie.title}
                        width={1920}
                        height={1080}
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
