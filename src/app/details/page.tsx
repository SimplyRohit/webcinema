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
  const [item, setItem] = useState<any>([]);
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
    <div className="flex w-full h-screen animate-slideInLeftFast items-center  flex-col md:flex-row md:justify-center">
      <ImageHeader item={item} loading={loading} />

      <Details item={item} loading={loading} />
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
