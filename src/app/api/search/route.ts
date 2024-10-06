import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const apiUrl = query
    ? `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
    : `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    const sortedItems = response.data.results.sort(
      (a: any, b: any) => b.popularity - a.popularity
    );
    return NextResponse.json(sortedItems);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
