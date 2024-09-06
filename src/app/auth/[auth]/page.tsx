"use client";
import { cn } from "@/libs/utils";
import React from "react";
import { useRouter } from "next/navigation";
export default function Page(params: any) {
  const router = useRouter();
  if (params.params.auth === "login") {
    return (
      <div className="w-full md:pl-[100px] p-5 flex flex-col   h-full">
        <h1 className="text-[50px]">Login</h1>
        <p className="text-2xl py-2 pb-4">Email</p>
        <input
          className="w-[15rem] rounded 1 outline-none p-2 bg-black text-[#FFD700] "
          type="text"
        />
        <p className="text-2xl   py-2 pb-4 ">password</p>
        <input
          className="w-[15rem] rounded  outline-none p-2 bg-black text-[#FFD700] "
          type="text"
        />
        <button
          className="w-[10rem] ml-10 rounded mt-5 p-2 bg-black text-[#A4B3C9]  transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-none"
          type="submit"
        >
          Submit
        </button>
        <span className="text-[1rem] font-bold  pt-4 flex text-[#435165] items-center ">
          Don&#39;t have an account?
          <h1
            onClick={() => router.push("/auth/signup")}
            className="text-2xl pl-2 tracking-wider cursor-pointer"
          >
            SignUP
          </h1>
        </span>
      </div>
    );
  } else if (params.params.auth === "signup") {
    return (
      <div className="w-full md:pl-[100px] p-5 flex flex-col  h-full">
        <h1 className="text-[50px]">SignUp</h1>
        <p className="text-2xl   py-2 pb-4 ">password</p>
        <input
          className="w-[15rem] rounded  outline-none p-2 bg-black text-[#FFD700] "
          type="text"
        />
        <p className="text-2xl py-2 pb-4">Email</p>
        <input
          className="w-[15rem] rounded 1 outline-none p-2 bg-black text-[#FFD700] "
          type="text"
        />
        <p className="text-2xl   py-2 pb-4 ">password</p>
        <input
          className="w-[15rem] rounded  outline-none p-2 bg-black text-[#FFD700] "
          type="text"
        />
        <button
          className="w-[10rem] ml-10 rounded mt-5 p-2 bg-black text-[#ffffff] transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-none"
          type="submit"
        >
          Submit
        </button>
        <span className="text-[1rem] font-bold  pt-4 flex text-[#435165] items-center ">
          Already have an account?
          <h1
            onClick={() => router.push("/auth/login")}
            className="text-2xl pl-2 tracking-wider cursor-pointer "
          >
            LogIN
          </h1>
        </span>
      </div>
    );
  }
}
