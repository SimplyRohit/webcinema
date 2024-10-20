import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
function Cast(props: any) {
  const [cast, setCast] = useState([]);

  const { item } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const name = item.name;
      const id = item.id;
      try {
        const response = await axios.post(`api/details/cast`, { name, id });
        setCast(response.data.cast);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [item]);
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full max-h-[800px] w-full flex-row flex-wrap overflow-y-auto pt-3">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="mx-1 flex h-[100px] w-[120px] items-center md:mx-2"
              >
                <div className="shimmer h-[100px] min-w-[60px] rounded-xl"></div>
                <div className="h-[100px] w-[60px] items-center pl-1">
                  <h1>name</h1>
                  <p className="text-[12px]">...</p>
                </div>
              </div>
            ))
          : cast.map((item: any) => (
              <div
                key={item.id}
                className="mx-1 flex h-[100px] w-[120px] items-center md:mx-2"
              >
                <div className="h-[100px] w-[60px]">
                  <Image
                    className="rounded-[10px]"
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    alt="Movie poster"
                    width={60}
                    height={100}
                    unoptimized
                  />
                </div>
                <div className="h-[100px] w-[60px] items-center pl-1">
                  <h1>{item.name}</h1>
                  <p className="text-[12px]">{item.character}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Cast;
