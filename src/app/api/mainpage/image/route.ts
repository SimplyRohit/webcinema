"use server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=23b2eec7e3fab51943e211619621ce2a&language=en-US&page=1`
    );
    if (!response.ok) {
      throw new Error(`API returned status code ${response.status}`);
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