"use client";
import {
  House,
  Search,
  CirclePlay,
  Monitor,
  Cookie,
  Drama,
  BookCopy,
  LibraryBig,
  Settings,
} from "lucide-react";
import { cn } from "@/libs/utils";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="fixed left-0 top-1/3 pl-2  h-full">
      <nav className="flex flex-col items-center rounded-[10px] justify-evenly w-[54px] h-[420px] backdrop-blur-sm bg-opacity-50 bg-[#000000] ">
        <House
          onClick={() => router.push("/")}
          className={cn(
            path === "/" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
        <Search
          onClick={() => router.push("/search")}
          className={cn(
            path === "/search" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
        <CirclePlay
          onClick={() => router.push("/movies")}
          className={cn(
            path === "/movies" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
        <Monitor
          onClick={() => router.push("/tv")}
          className={cn(
            path === "/tv" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
        <Cookie
          onClick={() => router.push("/anime")}
          className={cn(
            path === "/anime" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
        <Drama
          onClick={() => router.push("/kdrama")}
          className={cn(
            path === "/kdrama" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
        <BookCopy
          onClick={() => router.push("/collections")}
          className={cn(
            path === "/collections" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
        <LibraryBig
          onClick={() => router.push("/library")}
          className={cn(
            path === "/library" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
        <Settings
          onClick={() => router.push("/settings")}
          className={cn(
            path === "/settings" ? "text-[#ffde24]" : "text-[#576B87]",
            "w-5 h-5"
          )}
        />
      </nav>
    </div>
  );
}
