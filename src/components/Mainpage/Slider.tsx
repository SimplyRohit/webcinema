"use client";
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { db } from "@/DB/db";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/libs/utils";
import axios from "axios";
const roboto = Roboto_Mono({ subsets: ["latin"] });
export default function Slider(props: any) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);
  const endpoint = props.endpoint;
  const [ref] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 9,
      spacing: 15,
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  return (
    <div ref={ref} className="keen-slider  overflow-x-auto h-[270px] ">
      {movies.slice(0, 20).map((item: any) => (
        <div key={item.id} className="keen-slider__slide !min-w-[200px]">
          <Image
            className="object-cover  h-[250px] rounded"
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.name}
            width={1920}
            height={1080}
          ></Image>
          <p className={cn(roboto.className, "truncate")}>
            {item.name}
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}
