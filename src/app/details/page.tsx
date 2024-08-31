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
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        setItem(response.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  return (
    <div className="flex w-full md:h-svh items-center flex-col md:flex-row justify-center">
      <div className="md:w-[75vw] md:ml-20 h-full">
        <ImageHeader item={loading ? "" : item} loading={loading} />
      </div>
      <div className="md:w-[23vw] h-[96%] md:mb-8 rounded-[15px] transition-all items-center justify-center overflow-hidden duration-300 mr-3 ease-in-out md:hover:w-[37vw]">
        <Details item={loading ? "" : item} loading={loading} />
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
