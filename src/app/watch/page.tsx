"use client";
import nookies from "nookies";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import { string } from "zod";

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
  const randomid = Math.random().toString(36).substring(2, 15);

  const videasy = `https://vidrock.net/${
    type === "tv" ? `tv/${id}/${season}/${episode}` : `movie/${id}`
  }`;
  const vidrock = `https://player.videasy.net/${
    type === "tv" ? `tv/${id}/${season}/${episode}` : `movie/${id}`
  }`;
  const vidjoy = `https://vidjoy.pro/embed/${type}/${id}${
    type === "tv" ? `/${season}/${episode}` : ""
  }?adFree=true`;
  const modernserver = `https://embed.su/embed/${type}/${id}${
    type === "tv" ? `/${season}/${episode}` : ""
  }`;
  const Vidsrc = `https://vidsrc.xyz/embed/${type}/${id}${
    type === "tv" ? `/${season}/${episode}` : ""
  }`;

  useEffect(() => {
    setUrl(vidrock);
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
  }, [vidrock, id, type]);

  const handleServerChange = (e: any) => {
    const selectedServer = e.target.value;
    switch (selectedServer) {
      case "vidrock":
        setUrl(vidrock);
        break;
      case "vidjoy":
        setUrl(vidjoy);
        break;
      case "modernserver":
        setUrl(modernserver);
        break;
      case "vidsrc":
        setUrl(Vidsrc);
        break;
      case "videasy":
        setUrl(videasy);
        break;
      default:
        setUrl(vidrock);
        break;
    }
  };

  return (
    <div className="h-screen w-screen bg-black relative">
      <div className="absolute top-1 left-1/2 -translate-x-1/2  z-50 flex items-center justify-center gap-4">
        <select
          className="rounded-md bg-[#1B1B1B] p-3 pr-12 text-white text-sm md:text-base hover:bg-[#2B2B2B] transition-colors"
          onChange={handleServerChange}
        >
          <option value="vidrock">Vidrock</option>
          <option value="vidjoy">Vidjoy</option>
          <option value="modernserver">Modern Server</option>
          <option value="vidsrc">Multi</option>
          <option value="videasy">Videasy</option>
        </select>

        <Link
          href={`/watchparty/${randomid}?wpurl=${url}`}
          className="rounded-md bg-[#1B1B1B] p-3 px-6 truncate
           text-white text-sm md:text-base hover:bg-[#2B2B2B] transition-colors"
        >
          Start Watch Party
        </Link>
      </div>

      <div className="flex md:h-screen h-[calc(100vh-4rem)] w-screen">
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
