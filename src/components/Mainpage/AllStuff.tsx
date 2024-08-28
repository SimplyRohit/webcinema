// import React from "react";
// import Slider from "./Slider";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Roboto_Mono } from "next/font/google";
// import { cn } from "@/libs/utils";
// import { url } from "inspector";
// const roboto = Roboto_Mono({ subsets: ["latin"] });
// function AllStuff() {
//   const maindata = [
//     {
//       id: 1,
//       name: "Latest Movies",
//       url: "https://api.themoviedb.org/3/discover/movie?api_key=21adfad015207a4c85a59b73ff60ddec&primary_release_date.gte=2024-08-01&primary_release_date.lte=2024-08-31&page=1",
//     },
//     {
//       id: 1,
//       name: "Latest TV-Shows",
//       url: "https://api.themoviedb.org/3/discover/tv?api_key=21adfad015207a4c85a59b73ff60ddec&first_air_date.gte=2024-08-01&first_air_date.lte=2024-08-31&page=1",
//     },
//     {
//       id: 1,
//       name: "Popular Movies",
//       url: "https://api.themoviedb.org/3/movie/popular?api_key=21adfad015207a4c85a59b73ff60ddec&language=en-US&page=1",
//     },
//     {
//       id: 1,
//       name: "Popular TV-Shows",
//       url: "https://api.themoviedb.org/3/tv/popular?api_key=21adfad015207a4c85a59b73ff60ddec&language=en-US&page=1",
//     },
//   ];

//   return maindata.map((item) => (
//     <div key={item.id} className="pl-1 w-full h-full ">
//       <div className=" pb-[40px] pt-[40px] ">
//         <div className="flex flex-row items-center justify-between ">
//           <h1 className={cn("text-[25px] pb-3")}>{item.name}</h1>
//           <div className="flex flex-row items-center pr-2 justify-center">
//             <ChevronLeft className="text-[#A4B3C9] w-5 h-5" />
//             <p className={cn(roboto.className, "text-[#A4B3C9] text-[12px]")}>
//               swipe
//             </p>
//             <ChevronRight className="text-[#A4B3C9] w-5 h-5" />
//           </div>
//         </div>
//         <Slider endpoint={item.url} />
//       </div>
//     </div>
//   ));
// }

// export default AllStuff;
