"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";
import Arrow from "@/components/Arrow";
import { FilterX } from "lucide-react";
import { notFound } from "next/navigation";

const roboto = Roboto_Mono({ subsets: ["latin"] });

function Page(params: any) {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const data = (() => {
    switch (params.params.id) {
      case "movie":
        return "movie/popular?";
      case "tv":
        return "tv/popular?";
      case "anime":
        return "discover/movie?with_genres=16&";
      case "kdrama":
        return "discover/movie?with_genres=18&";
      default:
        return "";
    }
  })();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${data}api_key=21adfad015207a4c85a59b73ff60ddec&page=1`
        );
        setMovies(response.data.results);
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  if (
    params.params.id === "movie" ||
    params.params.id === "tv" ||
    params.params.id === "kdrama" ||
    params.params.id === "anime"
  ) {
    return (
      <div className="w-full pl-[100px] p-5 flex flex-col h-full">
        <div className="flex pb-5">
          <h1 className={cn("font-bold text-[25px] pb-3")}>
            {params.params.id}
          </h1>
        </div>
        <div className="flex flex-row pb-5 justify-between">
          <div className="flex space-x-5">
            <h1 className={cn(roboto.className, "")}>Latest</h1>
            <h1 className={cn(roboto.className, "")}>Trending</h1>
            <h1 className={cn(roboto.className, "")}>Top-Rated</h1>
          </div>
          <div className="flex items-center">
            <h1 className={cn(roboto.className, "")}>Filter</h1>
            <FilterX className="text-[#A4B3C9] w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-10 w-full h-full">
          {loading
            ? Array.from({ length: 18 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col mr-10 mb-12 max-w-[150px] max-h-[278px]"
                >
                  <div className="flex min-h-[250px] min-w-[150px] rounded shimmer"></div>
                  <p className={cn(roboto.className, "truncate")}>Loading...</p>
                </div>
              ))
            : movies.slice(0, 18).map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col mr-10 mb-12 max-w-[150px] max-h-[278px]"
                >
                  <div className="flex min-h-[250px] min-w-[150px]">
                    <Image
                      className="object-cover rounded"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      width={1920}
                      height={1080}
                      alt={item.title || item.name}
                    />
                  </div>
                  <p className={cn(roboto.className, "truncate")}>
                    {item.title || item.name}
                  </p>
                </div>
              ))}
        </div>
        <Arrow />
      </div>
    );
  } else {
    return notFound();
  }
}

export default Page;
