"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Roboto_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/auth/client";
import toast from "react-hot-toast";
import { getUser, signOutAction } from "@/actions/users";
const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function Page() {
  const { auth } = createSupabaseClient();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [User, setUser] = React.useState<any>(null);
  // auth.onAuthStateChange((event, session) => {
  //   setUser(session?.user ?? null);
  // });
  useEffect(() => {
    startTransition(async () => {
      const resposne = await getUser();
      setUser(resposne);
    });
  }, []);

  const onSignOut = () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("SignOut successful");
        setUser(null);
      }
    });
  };

  return (
    <div className="flex h-full w-full flex-col p-5 md:pl-[100px]">
      {User !== null ? (
        <div className="flex flex-col pb-5">
          <h1 className={cn("text-[50px] font-bold")}>Account</h1>
          <div className="flex flex-col items-start">
            <h1 className={cn("text-2xl")}>{User.email}</h1>
            <button onClick={() => onSignOut()} disabled={isPending}>
              <h1 className={cn(roboto.className, "cursor-pointer text-2xl")}>
                {isPending ? "SignOut..." : "SignOut"}
              </h1>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col pb-5">
          <h1 className={cn("text-[50px] font-bold")}>Account</h1>
          <div className="flex flex-col">
            <h1
              onClick={() => router.push("/auth/login")}
              className={cn(roboto.className, "cursor-pointer text-2xl")}
            >
              Login
            </h1>
            <h1
              onClick={() => router.push("/auth/signup")}
              className={cn(roboto.className, "cursor-pointer text-2xl")}
            >
              Signup
            </h1>
          </div>
        </div>
      )}

      <div className="flex flex-col pb-5">
        <h1 className={cn("text-[50px] font-bold")}>Appearance</h1>
        <div className="flex flex-col">
          <h1 className={cn(roboto.className, "cursor-pointer text-2xl")}>
            Mode
          </h1>
          <h1 className={cn(roboto.className, "cursor-pointer text-2xl")}>
            Accent Color
          </h1>
        </div>
      </div>

      <div className="flex flex-col pb-5">
        <h1 className={cn("text-[50px] font-bold")}>App Center</h1>
        <div className="flex flex-col">
          <h1
            onClick={() => router.push("/")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            Home
          </h1>
          <h1
            onClick={() => router.push("/search")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            Search
          </h1>
          <h1
            onClick={() => router.push("/movie")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            Movies
          </h1>
          <h1
            onClick={() => router.push("/tv")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            TV-Shows
          </h1>
          <h1
            onClick={() => router.push("/anime")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            Anime
          </h1>
          <h1
            onClick={() => router.push("/kdrama")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            K-Drama
          </h1>
          <h1
            onClick={() => router.push("/collections")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            Collections
          </h1>
          <h1
            onClick={() => router.push("/library")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            Library
          </h1>
          <h1
            onClick={() => router.push("/settings")}
            className={cn(roboto.className, "cursor-pointer text-2xl")}
          >
            Settings
          </h1>
        </div>
      </div>

      <div className="flex flex-col pb-5">
        <h1 className={cn("pb-3 text-[50px] font-bold")}>Links</h1>
        <div className="flex flex-col">
          <h1 className={cn(roboto.className, "cursor-pointer text-2xl")}>
            Website
          </h1>
        </div>
      </div>
    </div>
  );
}
