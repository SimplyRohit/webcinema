// src/app/api/mainpage/page/route.ts
"use server";
import { NextResponse } from "next/server";
import { any } from "zod";

const maindata = [
  {
    id: 0,
    name: "Recommendation",
    url: `https://api.themoviedb.org/3/movie/157336/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 1,
    name: "Latest Movies",
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`,
  },
  {
    id: 2,
    name: "Latest TV-Shows",
    url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`,
  },
  {
    id: 3,
    name: "K-Drama Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_origin_country=KR&sort_by=popularity.desc&page=1`, // Fixed sort_by syntax
  },
  {
    id: 4,
    name: "K-Drama Shows",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_origin_country=KR&sort_by=popularity.desc&page=1`, // Fixed sort_by syntax
  },
  {
    id: 5,
    name: "Anime Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=16&sort_by=popularity.desc&page=1`, // Fixed pag to page
  },
  {
    id: 6,
    name: "Anime Shows",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=16&sort_by=popularity.desc&page=1`,
  },
];

export async function GET() {
  try {
    const allData = await Promise.all<any>(
      maindata.map(async (item) => {
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error(
            `Error fetching ${item.name}: ${response.statusText}`
          );
        }

        const data = await response.json();
        return { name: item.name, data };
      })
    );

    return NextResponse.json(allData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
