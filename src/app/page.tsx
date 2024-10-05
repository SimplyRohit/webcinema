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
    url: `https://api.themoviedb.org/3/movie/157336/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 1,
    name: "Latest Movies",
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`,
  },
  {
    id: 2,
    name: "Latest TV-Shows",
    url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`,
  },
  {
    id: 3,
    name: "K-Drama Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_origin_country=KR&sort_by=popularity.escpage=1`,
  },
  {
    id: 4,
    name: "K-Drama Shows",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_origin_country=KR&sort_by=popularity.despage=1`,
  },
  {
    id: 5,
    name: "Anime Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=16&sort_by=popularity.desc&pag=1`,
  },
  {
    id: 6,
    name: "Anime Shows",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=16&sort_by=popularity.desc&page=1`,
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
        setMoviesData(allData);
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
