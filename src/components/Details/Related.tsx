import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Roboto_Mono } from "next/font/google";
import Arrow from "../Arrow";
import { cn } from "@/lib/utils";

const roboto = Roboto_Mono({ subsets: ["latin"] });

function Related(props: any) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { item } = props;
  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const name = item.name;
      const id = item.id;
      try {
        const response = await axios.post(`api/details/related`, {
          id,
          name,
          count,
        });
        setRelated(response.data.results);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [item, count]);

  return (
    <div className="flex h-[800px] w-full flex-col overflow-y-auto overflow-x-hidden">
      {loading ? (
        <div className="flex h-full w-full flex-wrap items-center justify-center">
          {Array.from({ length: 18 }).map((_, index) => (
            <div
              key={index}
              className="shimmer mx-3 mb-6 flex max-h-[278px] max-w-[150px] flex-col rounded"
            >
              <div className="flex min-h-[250px] min-w-[150px] animate-pulse bg-gray-700"></div>
              <p
                className={cn(
                  roboto.className,
                  "animate-pulse truncate bg-gray-700",
                )}
              >
                Loading...
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center pt-5">
          {related.slice(0, 18).map((item: any) => (
            <div
              key={item.id}
              className="mx-3 mb-6 flex max-w-[100px] flex-col"
            >
              <div
                onClick={() =>
                  (window.location.href = `/details?id=${item.id}&type=${
                    item.title ? "movie" : "tv"
                  }`)
                }
                className="flex min-h-[100px] min-w-[50px] cursor-pointer"
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
      )}
      <div className="md:pl-[160px]">
        <Arrow count={count} setCount={setCount} />
      </div>
    </div>
  );
}

export default Related;
