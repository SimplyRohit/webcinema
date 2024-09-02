import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Roboto_Mono } from "next/font/google";
import Arrow from "../Arrow";
import { cn } from "@/libs/utils";

const roboto = Roboto_Mono({ subsets: ["latin"] });

function Related(props: any) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { item } = props;
  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${item.name ? "tv" : "movie"}/${
            item.id
          }/recommendations?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&page=${count}`
        );
        setRelated(response.data.results);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [item, count]);

  return (
    <div className="w-full h-[800px] overflow-y-auto overflow-x-hidden flex flex-col ">
      {loading ? (
        <div className="flex flex-wrap justify-center items-center w-full h-full">
          {Array.from({ length: 18 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col mx-3 mb-6 max-w-[150px] max-h-[278px] rounded shimmer"
            >
              <div className="flex min-h-[250px] min-w-[150px] bg-gray-700 animate-pulse"></div>
              <p
                className={cn(
                  roboto.className,
                  "truncate bg-gray-700 animate-pulse"
                )}
              >
                Loading...
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center pt-5 justify-center ">
          {related.slice(0, 18).map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col mx-3 mb-6  max-w-[100px] "
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
      )}
      <div className="md:pl-[160px]">
        <Arrow count={count} setCount={setCount} />
      </div>
    </div>
  );
}

export default Related;
