// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import prisma from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 401 });
    }

    const supabaseUser = signUpData?.user;
    if (!supabaseUser) {
      return NextResponse.json(
        { error: "Failed to get user information from Supabase" },
        { status: 500 }
      );
    }

    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          supabaseId: supabaseUser.id,
        },
      });

      return NextResponse.json(user, { status: 200 });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
