"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
        const response = await axios.post("/api/collections", { count });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [count]);

  return (
    <div className="mr:p-10 mb-16 flex h-full w-full flex-col items-center p-2 md:mb-0 md:pl-[100px] md:pr-12">
      <div className="flex h-full w-full items-center space-x-4 pt-5">
        <h1 className={cn(sans, "text-[25px]")}>All Collections</h1>
        <h1 className={cn("text-[25px] font-bold text-[#ffc31e]")}></h1>
      </div>
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
          : items.slice(0, 39).map((item: any) => (
              <div
                key={item.id}
                className="mx-3 mb-6 flex max-w-[100px] flex-col md:mb-12 md:mr-10 md:max-h-[278px] md:max-w-[150px]"
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
      <Arrow count={count} setCount={setCount} />
    </div>
  );
}

export default Page;
