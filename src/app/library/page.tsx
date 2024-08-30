"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { cn } from "@/libs/utils";

import { Roboto_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
const roboto = Roboto_Mono({ subsets: ["latin"] });
function Page() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);
  const router = useRouter();
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
    <div className="w-full sm:pl-[100px] p-5 flex flex-col  h-full">
      <div className="flex pb-5 ">
        <h1 className={cn("font-bold text-[25px] ")}> Movies</h1>
      </div>
      <div className="flex pb-5 space-x-5">
        <h1 className={cn(roboto.className, "")}>Watchlist</h1>
        <h1 className={cn(roboto.className, "")}>Continue-Watching</h1>
      </div>
      <div className="flex flex-row pb-5  justify-between ">
        <div className="flex space-x-5">
          <h1 className={cn(roboto.className, "")}>Movies</h1>
          <h1 className={cn(roboto.className, "")}>Tv-Show</h1>
        </div>
      </div>
    </div>
  );
}

export default Page;
