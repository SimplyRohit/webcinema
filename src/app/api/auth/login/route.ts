// import { NextRequest, NextResponse } from "next/server";
// import { supabase } from "@/utils/supabase";
// import nookies from "nookies";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();
//     console.log("Login Request Data:", { email, password });

//     const { data: signInData, error: signInError } =
//       await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//     if (signInError) {
//       console.error("Supabase Sign-In Error:", signInError);
//       return NextResponse.json({ error: signInError.message }, { status: 401 });
//     }

//     const supabaseUser = signInData?.user;
//     const session = signInData?.session;
//     console.log({ supabaseUser, session });
//     if (!supabaseUser || !session) {
//       return NextResponse.json(
//         { error: "Failed to get user or session information from Supabase" },
//         { status: 500 }
//       );
//     }

//     const cookieOptions = {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: session.expires_in,
//       path: "/",
//     };

//     nookies.set(null, "access_token", session.access_token, cookieOptions);
//     nookies.set(null, "refresh_token", session.refresh_token, cookieOptions);

//     return NextResponse.json({ message: "Login successful" }, { status: 200 });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return NextResponse.json(
//       { error: "Unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }
