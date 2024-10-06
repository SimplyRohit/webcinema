"use client";
import React, { useState, useEffect } from "react";
import nookies from "nookies";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/libs/utils";
import axios from "axios";
const roboto = Roboto_Mono({ subsets: ["latin"] });
import Image from "next/image";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [Type, setType] = useState("movie");
  const [List, setList] = useState("wl");
  const [watchlist, setWatchlist] = useState([]);
  const [Continue, setContinue] = useState([]);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1000);

  useEffect(() => {
    const cookies = nookies.get();
    const parsedWatchlist = cookies.watchlist
      ? JSON.parse(cookies.watchlist)
      : [];
    if (parsedWatchlist.length > 0) {
      setWatchlist(parsedWatchlist);
    }
    const parsedContinue = cookies.ContinueWatching
      ? JSON.parse(cookies.ContinueWatching)
      : [];
    if (parsedContinue.length > 0) {
      setContinue(parsedContinue);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const listToUse = List === "wl" ? watchlist : Continue;
        const responses = await axios.post(`/api/library`, {
          list: listToUse,
          type: Type,
        });
        setData(responses.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (
      (List === "wl" && watchlist.length > 0) ||
      (List === "cw" && Continue.length > 0)
    ) {
      fetchData();
    }
  }, [watchlist, Continue, Type, List]);

  return (
    <div className="w-full md:pl-[100px] md:items-start items-center ml-1 md:p-5 flex flex-col h-full">
      <div className="flex pb-5">
        <h1 className={cn("font-bold text-[25px]")}>Library</h1>
      </div>
      <div className="flex pb-5 space-x-5">
        <h1
          onClick={() => setList("wl")}
          className={cn(
            List === "wl" && "text-[#e7c816]",
            roboto.className,
            "cursor-pointer"
          )}
        >
          Watchlist
        </h1>
        <h1
          onClick={() => setList("cw")}
          className={cn(
            List === "cw" && "text-[#e7c816]",
            roboto.className,
            "cursor-pointer"
          )}
        >
          Continue-Watching
        </h1>
      </div>
      <div className="flex flex-row pb-5 justify-between">
        <div className="flex space-x-5">
          <h1
            onClick={() => setType("movie")}
            className={cn(
              Type === "movie" && "text-[#e7c816]",
              roboto.className,
              "cursor-pointer"
            )}
          >
            Movies
          </h1>
          <h1
            onClick={() => setType("tv")}
            className={cn(
              Type === "tv" && "text-[#e7c816]",
              roboto.className,
              "cursor-pointer"
            )}
          >
            Tv-Show
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap md:justify-start justify-center items-center md:mt-10 w-full h-full">
        {loading
          ? Array.from({ length: 18 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col md:mr-10 md:mb-12 max-w-[150px] max-h-[278px]"
              >
                <div className="flex min-h-[250px] min-w-[150px] rounded shimmer"></div>
                <p className={cn(roboto.className, "truncate")}>Loading...</p>
              </div>
            ))
          : data.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col md:mr-8 md:mx-0 mx-5 md:mb-12 mb-6 md:max-w-[150px] max-w-[100px] md:max-h-[278px]"
              >
                <div
                  onClick={() =>
                    router.push(
                      `/details?id=${item.id}&type=${
                        item.title ? "movie" : "tv"
                      }`
                    )
                  }
                  className="flex md:min-h-[250px] min-h-[100px] min-w-[50px] md:min-w-[150px]"
                >
                  <Image
                    className="object-cover rounded"
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
    </div>
  );
}

export default Page;
