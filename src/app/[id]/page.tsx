"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Roboto_Mono } from "next/font/google";
import Arrow from "@/components/Arrow";
import { FilterX } from "lucide-react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
const roboto = Roboto_Mono({ subsets: ["latin"] });

function Page(params: any) {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(1);
  const [type, setType] = useState("now_playing");
  const router = useRouter();

  const data = (() => {
    switch (params.params.id) {
      case "movie":
        return `movie/${type}?`;
      case "tv":
        return `tv/${type === "now_playing" ? "airing_today" : type}?`;
      case "anime":
        return type === "now_playing"
          ? "discover/movie?with_genres=16&"
          : "discover/tv?&with_genres=16&";
      case "kdrama":
        return type === "now_playing"
          ? "discover/movie?with_origin_country=KR&"
          : "discover/tv?with_origin_country=KR&";
      default:
        return "";
    }
  })();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`api/id`, {
          data,
          count,
        });

        setMovies(response.data.results);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data, count]);

  const renderSortOptions = () => {
    if (params.params.id === "anime" || params.params.id === "kdrama") {
      return (
        <>
          <h1
            onClick={() => setType("now_playing")}
            className={cn(
              type === "popular" ? "" : "text-[#FFB800]",
              roboto.className,
              "cursor-pointer pr-1",
            )}
          >
            Movie
          </h1>
          <h1
            onClick={() => setType("popular")}
            className={cn(
              type === "popular" ? "text-[#FFB800]" : "",
              roboto.className,
              "cursor-pointer pr-1",
            )}
          >
            Show
          </h1>
        </>
      );
    } else {
      return (
        <>
          <h1
            onClick={() => setType("now_playing")}
            className={cn(
              type === "now_playing" ? "text-[#FFB800]" : "",
              roboto.className,
              "cursor-pointer pr-1",
            )}
          >
            Latest
          </h1>

          <h1
            onClick={() => setType("popular")}
            className={cn(
              type === "popular" ? "text-[#FFB800]" : "",
              roboto.className,
              "cursor-pointer pr-1",
            )}
          >
            Trending
          </h1>
          {params.params.id === "anime" || params.params.id === "kdrama"}
          <h1
            onClick={() => setType("top_rated")}
            className={cn(
              type === "top_rated" ? "text-[#FFB800]" : "",
              roboto.className,
              "cursor-pointer pr-1",
            )}
          >
            Top-Rated
          </h1>
        </>
      );
    }
  };

  if (["movie", "tv", "anime", "kdrama"].includes(params.params.id)) {
    return (
      <div className="mb-[calc(100vh-90vh)] flex h-full w-full flex-col items-center p-2 md:mb-0 md:items-start md:p-5 md:pl-[100px]">
        <div className="flex pb-5">
          <h1 className={cn("pt-2 text-[25px] font-bold")}>
            {params.params.id.charAt(0).toUpperCase() +
              params.params.id.slice(1)}
          </h1>
        </div>
        <div className="flex flex-row justify-between pb-5">
          <div className="flex space-x-2">{renderSortOptions()}</div>
        </div>

        <div className="flex h-full w-full flex-wrap items-center justify-center md:mt-10 md:justify-start">
          {loading
            ? Array.from({ length: 18 }).map((_, index) => (
                <div
                  key={index}
                  className="mb-8 flex max-h-[278px] max-w-[150px] flex-col md:mb-12 md:mr-10"
                >
                  <div className="shimmer flex min-h-[250px] min-w-[150px] rounded"></div>
                  <p className={cn(roboto.className, "truncate")}>Loading...</p>
                </div>
              ))
            : movies.slice(0, 18).map((item: any) => (
                <div
                  key={item.id}
                  className="mx-5 mb-8 flex max-w-[100px] flex-col md:mx-0 md:mb-12 md:mr-8 md:max-h-[278px] md:max-w-[150px]"
                >
                  <div
                    onClick={() =>
                      router.push(
                        `/details?id=${item.id}&type=${
                          item.title ? "movie" : "tv"
                        }`,
                      )
                    }
                    className="flex min-h-[100px] min-w-[50px] md:min-h-[250px] md:min-w-[150px]"
                  >
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
        <Arrow count={count} setCount={setCount} />
      </div>
    );
  } else {
    return notFound();
  }
}

export default Page;
