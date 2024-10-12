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
import prisma from "@/lib/prisma";

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
      <div className="flex h-full w-full flex-col p-5 md:pl-[100px]">
        <h1 className="text-[50px]">Login</h1>
        <form
          onSubmit={handleSubmitLogin(onLoginSubmit)}
          className="flex flex-col"
        >
          <p className="pb-2 pt-4 text-2xl">Email</p>
          <input
            className="w-[15rem] rounded bg-black p-2 text-[#FFD700] outline-none"
            type="text"
            {...registerLogin("email")}
            disabled={isPending}
          />
          {errorsLogin.email && (
            <p className="text-red-500">{errorsLogin.email.message}</p>
          )}

          <p className="pb-2 pt-4 text-2xl">Password</p>
          <input
            className="w-[15rem] rounded bg-black p-2 text-[#FFD700] outline-none"
            type="password"
            {...registerLogin("password")}
            disabled={isPending}
          />
          {errorsLogin.password && (
            <p className="text-red-500">{errorsLogin.password.message}</p>
          )}

          <button
            className="ml-10 mt-5 w-[10rem] transform rounded bg-black p-2 text-[#A4B3C9] transition duration-150 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-none"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loggingginn..." : "Login"}
          </button>
          <span className="flex items-center pt-4 text-[1rem] font-bold text-[#435165]">
            Don&#39;t have an account?
            <h1
              onClick={() => router.push("/auth/signup")}
              className="cursor-pointer pl-2 text-2xl tracking-wider"
            >
              SignUP
            </h1>
          </span>
        </form>
      </div>
    );
  } else if (params.params.auth === "signup") {
    return (
      <div className="flex h-full w-full flex-col p-5 md:pl-[100px]">
        <h1 className="text-[50px]">SignUp</h1>
        <form
          className="flex flex-col"
          onSubmit={handleSubmitSignup(onSignupSubmit)}
        >
          <p className="pb-2 pt-4 text-2xl">username</p>
          <input
            className="w-[15rem] rounded bg-black p-2 text-[#FFD700] outline-none"
            type="text"
            {...registerSignup("username")}
            disabled={isPending}
          />
          {errorsSignup.username && (
            <p className="text-red-500">{errorsSignup.username.message}</p>
          )}
          <p className="pb-2 pt-4 text-2xl">Email</p>
          <input
            className="1 w-[15rem] rounded bg-black p-2 text-[#FFD700] outline-none"
            type="text"
            {...registerSignup("email")}
            disabled={isPending}
          />
          {errorsSignup.email && (
            <p className="text-red-500">{errorsSignup.email.message}</p>
          )}
          <p className="pb-2 pt-4 text-2xl">password</p>
          <input
            className="w-[15rem] rounded bg-black p-2 text-[#FFD700] outline-none"
            type="password"
            {...registerSignup("password")}
            disabled={isPending}
          />
          {errorsSignup.password && (
            <p className="text-red-500">{errorsSignup.password.message}</p>
          )}
          <button
            className="ml-10 mt-5 w-[10rem] transform rounded bg-black p-2 text-[#ffffff] transition duration-150 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-none"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "submitingg..." : "Submit"}
          </button>
        </form>
        <span className="flex items-center pt-4 text-[1rem] font-bold text-[#435165]">
          Already have an account?
          <h1
            onClick={() => router.push("/auth/login")}
            className="cursor-pointer pl-2 text-2xl tracking-wider"
          >
            LogIN
          </h1>
        </span>
      </div>
    );
  }
}
