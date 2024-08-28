"use client";
import React from "react";
import { usePathname } from "next/navigation";

function page(params: any) {
  const path = usePathname();
  return (
    <div className=" flex w-full h-full items-center justify-center">
      <h1 className="text-[25px]">Details {path}</h1>
    </div>
  );
}

export default page;
