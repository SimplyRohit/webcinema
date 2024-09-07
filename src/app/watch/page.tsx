"use client";
import nookies from "nookies";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function EmbedContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  const embedURL = `https://vidsrc.cc/v2/embed/${type}/${id}${
    type === "tv" ? `/${season}/${episode}` : ""
  }`;
  useEffect(() => {
    const cookies = nookies.get();
    const ContinueWatching = cookies.ContinueWatching
      ? JSON.parse(cookies.ContinueWatching)
      : [];
    if (!ContinueWatching.some((content: any) => content.id === id)) {
      ContinueWatching.push({ id, type });
      nookies.set(null, "ContinueWatching", JSON.stringify(ContinueWatching), {
        path: "/",
      });
    }
  });
  return (
    <div className="bg-black w-screen h-screen ">
      <div className="  py-1 h-[calc(100vh-7rem)] md:h-[100vh] ">
        <iframe
          src={embedURL}
          title="Embedded Content"
          className="w-full h-full "
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
