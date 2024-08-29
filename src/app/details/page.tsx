"use client";
import ImageHeader from "@/components/Details/Image";
import Details from "@/components/Details/Details";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=21adfad015207a4c85a59b73ff60ddec`
        );
        setItem(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!item) {
    return <div>No data found </div>;
  }

  return (
    <div className="flex w-full h-svh  items-center  flex-row justify-center">
      <div className="w-[75vw] ml-20   h-full">
        <ImageHeader item={item} loading={loading} />
      </div>
      <div className="w-[23vw] h-full pb-12 transition-all items-center justify-center  overflow-hidden duration-300 mr-3 ease-in-out hover:w-[37vw]">
        <Details item={item} loading={loading} />
      </div>
    </div>
  );
}

export default Page;
