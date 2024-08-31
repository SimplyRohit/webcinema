export const maindata = [
  {
    id: 0,
    name: "Recommendation",
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 1,
    name: "Latest Movies",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&primary_release_date.gte=2024-08-01&primary_release_date.lte=2024-08-31&page=1`,
  },
  {
    id: 2,
    name: "Latest TV-Shows",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&first_air_date.gte=2024-08-01&first_air_date.lte=2024-08-31&page=1`,
  },
  {
    id: 3,
    name: "Latest K-Drama",
    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  {
    id: 4,
    name: "Popular K-Drama",
    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  {
    id: 5,
    name: "Latest Anime",
    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  {
    id: 6,
    name: "Popular Anime",
    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}",
  },
  {
    id: 7,
    name: "Popular Movies",
    url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 8,
    name: "Popular TV-Shows",
    url: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
];
