"use server";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: any) {
  try {
    const { data, count } = await request.json();
    const response = await fetch(
      `https://api.themoviedb.org/3/${data}api_key=23b2eec7e3fab51943e211619621ce2a&page=${count}`
    );
    if (!response.ok) {
      throw new Error(`API returned status code ${response.status}`);
    }
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
