"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import Arrow from "@/components/Arrow";
import { Roboto_Mono } from "next/font/google";
import { Roboto_Serif } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";

const roboto = Roboto_Mono({ subsets: ["latin"] });
const sans = Roboto_Serif({ subsets: ["latin"] });
function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const movieEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=popularity.desc&page=${count}`;

        const tvEndpoint = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=popularity.desc&page=${count}`;

        const [moviesResponse, tvResponse] = await Promise.all([
          axios.get(movieEndpoint),
          axios.get(tvEndpoint),
        ]);
        const combinedResults: any = [
          ...moviesResponse.data.results,
          ...tvResponse.data.results,
        ].sort(() => Math.random() - 0.5);

        setItems(combinedResults);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [count]);

  return (
    <div className="w-full h-full items-center p-2 mr:p-10 sm:pr-12 sm:pl-[100px] flex flex-col">
      <div className=" pt-5 flex items-center space-x-4 w-full h-full">
        <h1 className={cn(sans, "  text-[25px]")}>All Collections</h1>
        <h1 className={cn("font-bold text-[#ffc31e] text-[25px]")}></h1>
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
          : items.slice(0, 39).map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col sm:mr-10 mx-3 sm:mb-12 mb-6 sm:max-w-[150px] max-w-[100px]  sm:max-h-[278px]"
              >
                <div
                  onClick={() =>
                    router.push(
                      `/details?id=${item.id}&type=${
                        item.title ? "movie" : "tv"
                      }`
                    )
                  }
                  className="flex sm:min-h-[250px] min-h-[100px] min-w-[50px] sm:min-w-[150px]"
                >
                  <Image
                    className="object-cover rounded"
                    src={`https://image.tmdb.org/t/p/w500${
                      item.poster_path ? item.poster_path : item.backdrop_path
                    }`}
                    width={1920}
                    height={1080}
                    alt={item.title || item.name}
                  />
                </div>
                <p className={cn(roboto.className, "truncate mt-1")}>
                  {item.title || item.name}{" "}
                </p>
              </div>
            ))}
      </div>
      <Arrow count={count} setCount={setCount} />
    </div>
  );
}

export default Page;
