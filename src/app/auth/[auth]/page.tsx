"use client";
// src/app/auth/[auth]/page.tsx
import { z } from "zod";
import { createAccountAction, loginAccountAction } from "@/actions/users";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/schema/zod";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import prisma from "@/libs/prisma";

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;
export default function Page(params: any) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

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
  const onLoginSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAccountAction(data);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("login successful");
        router.push("/");
      }
    });
  };
  const onSignupSubmit = (data: SignupFormData) => {
    startTransition(async () => {
      const result: any = await createAccountAction(data);
      if (result.errorMessage) {
        toast.error(result.errorMessage);
      } else {
        toast.success("verify your email");
        router.push("/auth/login");
      }
    });
  };

  if (params.params.auth === "login") {
    return (
      <div className="w-full md:pl-[100px] p-5 flex flex-col h-full">
        <h1 className="text-[50px]">Login</h1>
        <form
          onSubmit={handleSubmitLogin(onLoginSubmit)}
          className="flex flex-col"
        >
          <p className="text-2xl pb-2 pt-4">Email</p>
          <input
            className="w-[15rem] rounded outline-none p-2  text-[#FFD700]"
            type="text"
            {...registerLogin("email")}
            disabled={isPending}
          />
          {errorsLogin.email && (
            <p className="text-red-500">{errorsLogin.email.message}</p>
          )}

          <p className="text-2xl  pt-4 pb-2">Password</p>
          <input
            className="w-[15rem] rounded outline-none p-2 bg-black text-[#FFD700]"
            type="password"
            {...registerLogin("password")}
            disabled={isPending}
          />
          {errorsLogin.password && (
            <p className="text-red-500">{errorsLogin.password.message}</p>
          )}

          <button
            className="w-[10rem] ml-10 rounded mt-5 p-2 bg-black text-[#A4B3C9] transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-none"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loggingginn..." : "Login"}
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
          <p className="text-2xl   pb-2 pt-4 ">username</p>
          <input
            className="w-[15rem] rounded  outline-none p-2 bg-black text-[#FFD700] "
            type="text"
            {...registerSignup("username")}
            disabled={isPending}
          />
          {errorsSignup.username && (
            <p className="text-red-500">{errorsSignup.username.message}</p>
          )}
          <p className="text-2xl pb-2 pt-4">Email</p>
          <input
            className="w-[15rem] rounded 1 outline-none p-2 bg-black text-[#FFD700] "
            type="text"
            {...registerSignup("email")}
            disabled={isPending}
          />
          {errorsSignup.email && (
            <p className="text-red-500">{errorsSignup.email.message}</p>
          )}
          <p className="text-2xl pb-2 pt-4 ">password</p>
          <input
            className="w-[15rem] rounded  outline-none p-2 bg-black text-[#FFD700] "
            type="password"
            {...registerSignup("password")}
            disabled={isPending}
          />
          {errorsSignup.password && (
            <p className="text-red-500">{errorsSignup.password.message}</p>
          )}
          <button
            className="w-[10rem] ml-10 rounded mt-5 p-2 bg-black text-[#ffffff] transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-none"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "submitingg..." : "Submit"}
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
