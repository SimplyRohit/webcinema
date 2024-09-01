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
