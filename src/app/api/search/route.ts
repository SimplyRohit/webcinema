import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const apiUrl = query
    ? `https://api.themoviedb.org/3/search/multi?api_key=23b2eec7e3fab51943e211619621ce2a&query=${query}`
    : `https://api.themoviedb.org/3/trending/all/day?api_key=23b2eec7e3fab51943e211619621ce2a`;

  try {
    const response = await axios.get(apiUrl);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
