// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { db } from "@/DB/db";
// import { cn } from "@/libs/utils";
// import { Roboto_Mono } from "next/font/google";
// const roboto = Roboto_Mono({ subsets: ["latin"] });
// function Card() {
//   return (
//     <div className=" flex flex-wrap items-center jutify-between w-full  pl-[40px] h-full">
//       {db.map((item) => (
//         <Link
//           key={item.name}
//           href={""}
//           className="flex py-10 pr-12 flex-row items-center"
//         >
//           <Image
//             className="object-cover w-[140px] h-[230px] rounded-lg"
//             src={item.url}
//             width={1920}
//             height={1080}
//             alt=""
//           ></Image>
//           <div className="flex flex-col max-w-[210px] pl-4">
//             <h1 className={cn("font-bold text-[20px]")}>{item.name}</h1>
//             <p className={cn(roboto.className, "")}>{item.details}</p>
//             <p className={cn(roboto.className, "")}>{item.category}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default Card;
