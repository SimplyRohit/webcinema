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
import { Roboto_Mono } from "next/font/google";
const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: House, label: "Home", path: "/", tooltipPosition: "top" },
    {
      icon: Search,
      label: "Search",
      path: "/search",
      tooltipPosition: "right",
    },
    {
      icon: CirclePlay,
      label: "Movies",
      path: "/movie",
      tooltipPosition: "right",
    },
    { icon: Monitor, label: "TV Shows", path: "/tv", tooltipPosition: "right" },
    { icon: Cookie, label: "Anime", path: "/anime", tooltipPosition: "right" },
    {
      icon: Drama,
      label: "K-Drama",
      path: "/kdrama",
      tooltipPosition: "right",
    },
    {
      icon: BookCopy,
      label: "Collections",
      path: "/collections",
      tooltipPosition: "right",
      hiddenOnSmall: true,
    },
    {
      icon: LibraryBig,
      label: "Library",
      path: "/library",
      tooltipPosition: "right",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      tooltipPosition: "right",
      hiddenOnSmall: true,
    },
  ];

  return (
    <div
      className={cn("fixed md:left-0 bottom-[0rem] md:top-[30%] md:pl-2 z-50")}
    >
      <nav className="flex md:flex-col flex-row items-center md:rounded-[10px]  justify-evenly md:w-[54px] w-screen h-[3.8rem] md:h-[420px] md:backdrop-blur-sm md:bg-opacity-50 bg-[#000000]">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "relative group",
              item.hiddenOnSmall ? "hidden md:block" : "block"
            )}
          >
            <p
              className={cn(
                roboto.className,
                "absolute inline-block whitespace-nowrap p-2 bg-opacity-60 backdrop-blur-[0px] rounded-[6px] bg-[#4d4747] text-[#b8c2cf] text-[.9rem] tracking-[-.075em]",
                item.tooltipPosition === "top"
                  ? "left-1/2 transform -translate-x-1/2 -translate-y-1/3 bottom-full"
                  : "left-full top-1/2 transform -translate-y-1/2 ml-2",
                "opacity-0 md:group-hover:opacity-100"
              )}
            >
              {item.label}
            </p>
            <item.icon
              onClick={() => router.push(item.path)}
              className={cn(
                path === item.path ? "text-[#ffde24]" : "text-[#576B87]",
                "w-5 h-5 cursor-pointer"
              )}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
