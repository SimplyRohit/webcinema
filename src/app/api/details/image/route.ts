"use server";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const { id } = await request.json();
    const apiUrl = `https://api.themoviedb.org/3/${
      id ? "tv" : "movie"
    }/${id}/videos?api_key=${process.env.API_KEY}a`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data from TMDb API");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
