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
    <div className="w-full h-full flex  flex-col">
      <div className="flex flex-wrap pt-3 flex-row max-h-[800px] overflow-y-auto  w-full h-full">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex mx-1 md:mx-2 w-[120px] h-[100px] items-center "
              >
                <div className="w-[60px] shimmer  h-[100px]">
                  <Image
                    className="rounded-[10px]"
                    src={""}
                    alt=""
                    width={60}
                    height={100}
                    unoptimized
                  />
                </div>
                <div className="w-[60px] pl-1 h-[100px] items-center">
                  <h1>name</h1>
                  <p className="text-[12px]  ">...</p>
                </div>
              </div>
            ))
          : cast.map((item: any) => (
              <div
                key={item.id}
                className="flex mx-1 md:mx-2 w-[120px] h-[100px] items-center "
              >
                <div className="w-[60px]  h-[100px]">
                  <Image
                    className="rounded-[10px]"
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    alt="Movie poster"
                    width={60}
                    height={100}
                    unoptimized
                  />
                </div>
                <div className="w-[60px] pl-1 h-[100px] items-center">
                  <h1>{item.name}</h1>
                  <p className="text-[12px]  ">{item.character}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Cast;
