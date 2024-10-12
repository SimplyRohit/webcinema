"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function Card(params: any) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);

  const data = (() => {
    switch (params.endpoint) {
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
          `https://api.themoviedb.org/3/${data}api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`,
        );
        setMovies(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div className="mt-10 flex h-full w-full flex-wrap items-center">
      {loading
        ? Array.from({ length: 18 }).map((_, index) => (
            <div
              key={index}
              className="mb-12 mr-10 flex max-h-[278px] max-w-[150px] flex-col"
            >
              <div className="shimmer flex min-h-[250px] min-w-[150px] rounded"></div>
              <p className={cn(roboto.className, "truncate")}>Loading...</p>
            </div>
          ))
        : movies.slice(0, 18).map((item: any) => (
            <div
              key={item.id}
              className="mb-12 mr-10 flex max-h-[278px] max-w-[150px] flex-col"
            >
              <div className="flex min-h-[250px] min-w-[150px]">
                <Image
                  className="rounded object-cover"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  width={200}
                  height={200}
                  alt={item.title || item.name}
                  unoptimized
                />
              </div>
              <p className={cn(roboto.className, "truncate")}>
                {item.title || item.name}
              </p>
            </div>
          ))}
    </div>
  );
}
