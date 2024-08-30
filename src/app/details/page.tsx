"use client";

import ImageHeader from "@/components/Details/Image";
import Details from "@/components/Details/Details";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";

function PageContent() {
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
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (!item) {
    return <div>No data found</div>;
  }

  return (
    <div className="flex w-full sm:h-svh items-center flex-col sm:flex-row justify-center">
      <div className="sm:w-[75vw] sm:ml-20 h-full">
        <ImageHeader item={item} loading={loading} />
      </div>
      <div className="sm:w-[23vw] h-full pb-12 transition-all items-center justify-center overflow-hidden duration-300 mr-3 ease-in-out sm:hover:w-[37vw]">
        <Details item={item} loading={loading} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
