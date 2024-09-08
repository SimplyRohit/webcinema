"use client";
// src/app/auth/[auth]/page.tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/schema/zod";
import React from "react";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/navigation";
import axios from "axios";
type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;
export default function Page(params: any) {
  const router = useRouter();
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const onLoginSubmit = async (data: LoginFormData) => {
    // try {
    //   const response = await fetch("/api/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   const result = await response.json();
    //   console.log("login Response:", result);
    //   router.push("/settings");
    // } catch (error) {
    //   console.error("Login failed:", error);
    // }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    // try {
    //   const response = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   const result = await response.json();
    //   router.push("/auth/login");
    //   console.log("signup Response:", result);
    // } catch (error) {
    //   console.error("signup Error:", error);
    // }
  };

  if (params.params.auth === "login") {
    return (
      <div className="w-full md:pl-[100px] p-5 flex flex-col h-full">
        <h1 className="text-[50px]">Login</h1>
        <form
          onSubmit={handleSubmitLogin(onLoginSubmit)}
          className="flex flex-col"
        >
          <label className="text-2xl py-2 pb-4">Email</label>
          <input
            className="w-[15rem] rounded outline-none p-2 bg-black text-[#FFD700]"
            type="text"
            {...registerLogin("email")}
          />
          {errorsLogin.email && (
            <p className="text-red-500">{errorsLogin.email.message}</p>
          )}

          <label className="text-2xl py-2 pb-4">Password</label>
          <input
            className="w-[15rem] rounded outline-none p-2 bg-black text-[#FFD700]"
            type="password"
            {...registerLogin("password")}
          />
          {errorsLogin.password && (
            <p className="text-red-500">{errorsLogin.password.message}</p>
          )}

          <button
            className="w-[10rem] ml-10 rounded mt-5 p-2 bg-black text-[#A4B3C9] transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-none"
            type="submit"
          >
            Submit
          </button>
          <span className="text-[1rem] font-bold pt-4 flex text-[#435165] items-center">
            Don&#39;t have an account?
            <h1
              onClick={() => router.push("/auth/signup")}
              className="text-2xl pl-2 tracking-wider cursor-pointer"
            >
              SignUP
            </h1>
          </span>
        </form>
      </div>
    );
  } else if (params.params.auth === "signup") {
    return (
      <div className="w-full md:pl-[100px] p-5 flex flex-col  h-full">
        <h1 className="text-[50px]">SignUp</h1>
        <form
          className="flex flex-col"
          onSubmit={handleSubmitSignup(onSignupSubmit)}
        >
          <label className="text-2xl   py-2 pb-4 ">username</label>
          <input
            className="w-[15rem] rounded  outline-none p-2 bg-black text-[#FFD700] "
            type="text"
            {...registerSignup("username")}
          />
          {errorsSignup.username && (
            <p className="text-red-500">{errorsSignup.username.message}</p>
          )}
          <label className="text-2xl py-2 pb-4">Email</label>
          <input
            className="w-[15rem] rounded 1 outline-none p-2 bg-black text-[#FFD700] "
            type="text"
            {...registerSignup("email")}
          />
          {errorsSignup.email && (
            <p className="text-red-500">{errorsSignup.email.message}</p>
          )}
          <label className="text-2xl   py-2 pb-4 ">password</label>
          <input
            className="w-[15rem] rounded  outline-none p-2 bg-black text-[#FFD700] "
            type="password"
            {...registerSignup("password")}
          />
          {errorsSignup.password && (
            <p className="text-red-500">{errorsSignup.password.message}</p>
          )}
          <button
            className="w-[10rem] ml-10 rounded mt-5 p-2 bg-black text-[#ffffff] transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-none"
            type="submit"
          >
            Submit
          </button>
        </form>
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
