"use client";
import nookies from "nookies";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { string } from "zod";

interface Content {
  id: string;
  type: string;
}
function EmbedContent() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const [url, setUrl] = useState("");

  const modernserver = `https://embed.su/embed/${type}/${id}${
    type === "tv" ? `/${season}/${episode}` : ""
  }`;
  const Vidsrc = `https://vidsrc.xyz/embed/${type}/${id}${
    type === "tv" ? `/${season}/${episode}` : ""
  }`;

  useEffect(() => {
    setUrl(modernserver);
    const cookies = nookies.get();
    const ContinueWatching = cookies.ContinueWatching
      ? JSON.parse(cookies.ContinueWatching)
      : [];
    if (!ContinueWatching.some((content: Content) => content.id === id)) {
      ContinueWatching.push({ id, type });
      nookies.set(null, "ContinueWatching", JSON.stringify(ContinueWatching), {
        path: "/",
      });
    }
  }, [modernserver, id, type]);

  const handleServerChange = (e: any) => {
    const selectedServer = e.target.value;
    switch (selectedServer) {
      case "modernserver":
        setUrl(modernserver);
        break;
      case "vidsrc":
        setUrl(Vidsrc);
        break;
      default:
        setUrl(modernserver);
        break;
    }
  };

  return (
    <div className="h-screen w-screen bg-black">
      <select
        className="absolute right-2 top-2 z-50 rounded-sm bg-[#1B1B1B] p-2 text-white"
        onChange={handleServerChange}
      >
        <option value="modernserver">Server : 1 (Modern Server)</option>
        <option value="vidsrc">Server : 2 (Multi)</option>
      </select>
      <div className="h-[calc(100vh-7rem)] py-1 md:h-[100vh]">
        <iframe
          src={url}
          title="Embedded Content"
          className="h-full w-full"
          style={{ border: "none" }}
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmbedContent />
    </Suspense>
  );
}
