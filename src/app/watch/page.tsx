"use client";

import React, { Suspense } from "react";
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

  console.log(type, id, season, episode);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <iframe
        src={embedURL}
        title="Embedded TV Show Episode"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
      />
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
