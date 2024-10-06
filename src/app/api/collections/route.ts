"use server";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const { count } = await request.json();
    const movieEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=popularity.desc&page=${count}`;
    const tvEndpoint = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=popularity.desc&page=${count}`;
    const [moviesResponse, tvResponse] = await Promise.all([
      fetch(movieEndpoint),
      fetch(tvEndpoint),
    ]);
    if (!moviesResponse.ok || !tvResponse.ok) {
      throw new Error("Failed to fetch data from the API");
    }
    const moviesData = await moviesResponse.json();
    const tvData = await tvResponse.json();
    const combinedResults = [...moviesData.results, ...tvData.results].sort(
      () => Math.random() - 0.5
    );
    return NextResponse.json(combinedResults);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
