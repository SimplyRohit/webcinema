"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { cn } from "@/libs/utils";
import Image from "next/image";
import Arrow from "@/components/Arrow";
import { Roboto_Mono } from "next/font/google";
import { FilterX } from "lucide-react";
const roboto = Roboto_Mono({ subsets: ["latin"] });
function page() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=21adfad015207a4c85a59b73ff60ddec`
        );
        setMovies(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="w-full pl-[100px] p-5 flex flex-col  h-full">
      <div className="flex pb-5 ">
        <h1 className={cn("font-bold text-[25px] ")}> Movies</h1>
      </div>
      <div className="flex pb-5 space-x-5">
        <h1 className={cn(roboto.className, "")}>Watchlist</h1>
        <h1 className={cn(roboto.className, "")}>Continue Watching</h1>
      </div>
      <div className="flex flex-row pb-5  justify-between ">
        <div className="flex space-x-5">
          <h1 className={cn(roboto.className, "")}>Movies</h1>
          <h1 className={cn(roboto.className, "")}>Tv-Show</h1>
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
                <p className={cn(roboto.className, "truncate  ")}>Loading...</p>
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
}

export default page;
