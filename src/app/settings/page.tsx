"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";
import { useRouter } from "next/navigation";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function Page() {
  const router = useRouter();

  return (
    <div className="w-full md:pl-[100px] p-5 flex flex-col h-full">
      <div className="flex flex-col pb-5">
        <h1 className={cn("font-bold text-[50px]")}>Account</h1>
        <div className="flex flex-col">
          <h1
            onClick={() => router.push("/auth/login")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Login
          </h1>
          <h1
            onClick={() => router.push("/auth/signup")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Signup
          </h1>
        </div>
      </div>

      <div className="flex flex-col pb-5">
        <h1 className={cn("font-bold text-[50px]")}>Appearance</h1>
        <div className="flex flex-col">
          <h1 className={cn(roboto.className, "text-2xl cursor-pointer")}>
            Mode
          </h1>
          <h1 className={cn(roboto.className, "text-2xl cursor-pointer")}>
            Accent Color
          </h1>
        </div>
      </div>

      <div className="flex flex-col pb-5">
        <h1 className={cn("font-bold text-[50px]")}>App Center</h1>
        <div className="flex flex-col">
          <h1
            onClick={() => router.push("/")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Home
          </h1>
          <h1
            onClick={() => router.push("/search")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Search
          </h1>
          <h1
            onClick={() => router.push("/movie")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Movies
          </h1>
          <h1
            onClick={() => router.push("/tv")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            TV-Shows
          </h1>
          <h1
            onClick={() => router.push("/anime")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Anime
          </h1>
          <h1
            onClick={() => router.push("/kdrama")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            K-Drama
          </h1>
          <h1
            onClick={() => router.push("/collections")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Collections
          </h1>
          <h1
            onClick={() => router.push("/library")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Library
          </h1>
          <h1
            onClick={() => router.push("/settings")}
            className={cn(roboto.className, "text-2xl cursor-pointer")}
          >
            Settings
          </h1>
        </div>
      </div>

      <div className="flex flex-col pb-5">
        <h1 className={cn("font-bold text-[50px] pb-3")}>Links</h1>
        <div className="flex flex-col">
          <h1 className={cn(roboto.className, "text-2xl cursor-pointer")}>
            Website
          </h1>
        </div>
      </div>
    </div>
  );
}
