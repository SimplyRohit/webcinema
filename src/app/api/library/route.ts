"use server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { list, type } = await request.json();

    // Fetch movie details based on the provided list and type
    const responses = await Promise.all(
      list
        .filter((item: any) => item.type === type)
        .map((item: any) =>
          fetch(
            `https://api.themoviedb.org/3/${item.type}/${item.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          )
        )
    );

    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
