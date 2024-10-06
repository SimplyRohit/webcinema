"use server";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const { name, id, count } = await request.json();
    const apiUrl = `https://api.themoviedb.org/3/${
      name ? "tv" : "movie"
    }/${id}/recommendations?api_key=23b2eec7e3fab51943e211619621ce2a&language=en-US&page=${count}`;
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
