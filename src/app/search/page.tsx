"use client";
import React, { useState, useEffect } from "react";
import { Roboto_Mono } from "next/font/google";
import { Roboto_Serif } from "next/font/google";
import { cn } from "@/libs/utils";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Arrow from "@/components/Arrow";
import axios from "axios";

const sans = Roboto_Serif({ subsets: ["latin"] });
const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchMovies = async (query: string) => {
    setLoading(true);
    try {
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=21adfad015207a4c85a59b73ff60ddec&page=1`
        : `https://api.themoviedb.org/3/movie/popular?api_key=21adfad015207a4c85a59b73ff60ddec&page=1`;

      const response = await axios.get(endpoint);
      setMovies(response.data.results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("");
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchMovies(searchQuery);
      setIsSearching(true);
    } else {
      fetchMovies("");
      setIsSearching(false);
    }
  }, [searchQuery]);

  return (
    <div className="w-full h-full items-center p-10 pr-12 pl-[85px] flex flex-col">
      <div className="">
        <input
          className={cn(
            roboto.className,
            "rounded-lg w-[400px] h-[48px] bg-black text-[13px] px-3 placeholder:text-[12px] placeholder:text-[#5c6065] outline-none text-[#ffc31e]"
          )}
          placeholder="please enter at least 3 characters to search ....."
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="pt-5 flex items-center space-x-4 w-full h-full">
        <h1 className={cn(sans, "pl-10 text-[25px]")}>Top Searches</h1>
        <h1 className={cn("font-bold text-[#ffc31e] text-[25px]")}>today</h1>
      </div>
      <div className="flex flex-wrap items-center mt-10 w-full h-full">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching data: {error.message}</p>
        ) : (
          movies.slice(0, 18).map((item: any) => (
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
                  alt={item.title}
                />
              </div>
              <p className={cn(roboto.className, "truncate")}>
                {item.title || item.name}
              </p>
            </div>
          ))
        )}
      </div>
      <Arrow />
    </div>
  );
}
