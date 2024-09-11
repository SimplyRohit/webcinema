"use server";
import { createSupabaseClient } from "../auth/server";
import { getErrorMessage } from "../libs/utils";
import prisma from "@/libs/prisma";

export async function createAccountAction(data: any) {
  try {
    const { email, password, username } = data;
    const { auth } = createSupabaseClient();
    
    const { data: signUpData, error: signUpError } = await auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (signUpError) throw signUpError;

    const userId = signUpData?.user?.id;
    if (!userId) throw new Error("Failed to retrieve user ID from Supabase");

    await prisma.user.create({
      data: {
        email,
        username,
        supabaseId: userId, 
        password, 
      },
    });

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}


export async function loginAccountAction(data: any) {
  try {
    const email = data.email;
    const password = data.password;
    const { auth } = createSupabaseClient();
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export async function signOutAction() {
  try {
    const { auth } = createSupabaseClient();
    const { error } = await auth.signOut();

    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export async function getUser() {
  const { auth } = createSupabaseClient();
  const user = (await auth.getUser()).data.user;
  return user;
}
