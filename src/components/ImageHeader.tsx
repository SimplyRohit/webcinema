import React from "react";
import Image from "next/image";
import { Bookmark, Share, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { Roboto_Mono } from "next/font/google";
const roboto = Roboto_Mono({ subsets: ["latin"] });
export default function ImageHeader() {
  return (
    <div className="relative ml-[80px] flex flex-1 flex-col items-center   ">
      <div className=" w-full z-[-2] h-full">
        <Image
          className="rounded-[30px] object-cover w-full h-[750px]  m-2"
          src="https://image.tmdb.org/t/p/original//vVKlL4HyrQYAcJuaaUW49FrRqY5.jpg"
          alt="Picture of the author"
          width={1800}
          height={400}
        />
      </div>

      <div className=" absolute bottom-[-20px] left-[36%] flex flex-col items-center bg-[#000000] border-[15px] border-[#1B1919]   p-5 rounded-[40px]">
        {/* <div className="w-[500px] h-[5px] bg-[#1B1919] absolute bottom-[10px] rounded-t-[20px] z-[-1]  "></div> */}
        <div className="w-[50px] h-[50px] absolute bottom-[13px] left-[-63px] rounded-br-[50px] shadow-[70px_70px_0px_70px_#1B1919] z-[-1]   "></div>
        <div className="w-[50px] h-[50px] bottom-[13px] absolute left-[315px] rounded-bl-[50px] shadow-[-70px_70px_0px_70px_#1B1919]  z-[-1]"></div>

        <h1 className="font-bold text-[25px] pb-2">Drive</h1>
        <div className="flex flex-row space-x-2 items-center justify-center ">
          <p
            className={cn(
              roboto.className,
              " transfor  -rotate-[-90deg] text-[18px] origin-[60%_-10%] "
            )}
          >
            Movie
          </p>
          <Link
            className={cn(
              roboto.className,
              "p-1 bg-[#FFD700] rounded-[5px] flex"
            )}
            href=""
          >
            Watch{<Play className="w-5 fill-[#000000]" />}
          </Link>
          <Link className="p-1 bg-[#FFD700] rounded-[5px]" href="">
            Details
          </Link>
          <Bookmark className="w-5 h-5 text-[#4C5E77]" />
          <Share className="w-5 h-5 text-[#4C5E77]" />
        </div>
      </div>
    </div>
  );
}
