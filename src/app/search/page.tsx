"use client";
import React, { useState, useEffect } from "react";
import { Roboto_Mono } from "next/font/google";
import { Roboto_Serif } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const sans = Roboto_Serif({ subsets: ["latin"] });
const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const fetchItems = async (query: string) => {
    setLoading(true);
    try {
      const endpoint = query ? `/api/search?query=${query}` : `/api/search`;
      const response = await axios.get(endpoint);
      const sortedItems = response.data;
      setItems(sortedItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems("");
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchItems(searchQuery);
      setIsSearching(true);
    } else {
      fetchItems("");
      setIsSearching(false);
    }
  }, [searchQuery]);

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden pt-10 md:pl-[85px]">
      <div className="">
        <input
          className={cn(
            roboto.className,
            "h-[48px] w-[250px] rounded-lg bg-black px-3 text-[13px] text-[#ffc31e] outline-none placeholder:text-[12px] placeholder:text-[#5c6065] md:w-[350px]",
          )}
          placeholder="please enter at least 3 characters to search ....."
          type="text"
          onChange={(e) =>
            setTimeout(() => setSearchQuery(e.target.value), 800)
          }
        />
      </div>
      <div className="flex h-full w-full items-center space-x-2 pl-5 pt-5 md:pl-0">
        <h1 className={cn(sans, "p-2 text-[20px] md:pl-2 md:text-[25px]")}>
          Top Searches
        </h1>
        <h1
          className={cn("text-[20px] font-bold text-[#ffc31e] md:text-[25px]")}
        >
          today
        </h1>
      </div>
      <div className="mt-5 flex h-full w-full flex-wrap items-start justify-start pl-5 md:pl-0">
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
          : items.slice(0, 18).map((item: any) => (
              <div
                key={item.id}
                className="mx-5 mb-6 flex max-w-[100px] flex-col md:mb-12 md:mr-10 md:max-h-[278px] md:max-w-[150px]"
              >
                <div
                  onClick={() =>
                    router.push(
                      `/details?id=${item.id}&type=${item.media_type}`,
                    )
                  }
                  className="flex md:min-h-[250px] md:min-w-[150px]"
                >
                  <Image
                    className="rounded object-cover"
                    src={`https://image.tmdb.org/t/p/w500${
                      item.poster_path ? item.poster_path : item.backdrop_path
                    }`}
                    width={200}
                    height={200}
                    alt={item.title || item.name}
                    unoptimized
                  />
                </div>
                <p className={cn(roboto.className, "mt-1 truncate")}>
                  {item.title || item.name}{" "}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
