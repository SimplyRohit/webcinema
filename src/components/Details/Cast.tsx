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
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${item.name ? "tv" : "movie"}/${
            item.id
          }/credits?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&page=1`
        );
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
        {cast.map((item: any) => (
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
