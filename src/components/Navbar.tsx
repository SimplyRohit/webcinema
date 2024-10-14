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
import { cn } from "@/lib/utils";
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
      className={cn(
        "fixed bottom-[0rem] z-50 md:top-[0rem] md:flex md:w-0 md:items-center md:justify-center md:pl-2",
      )}
    >
      <nav className="flex h-[3.8rem] w-screen flex-row items-center justify-evenly bg-[#000000] md:absolute md:left-2 md:h-[420px] md:w-[54px] md:flex-col md:rounded-[10px] md:bg-opacity-50 md:backdrop-blur-sm">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "group relative",
              item.hiddenOnSmall ? "hidden md:block" : "block",
            )}
          >
            <p
              className={cn(
                roboto.className,
                "absolute inline-block whitespace-nowrap rounded-[6px] bg-[#4d4747] bg-opacity-60 p-2 text-[.9rem] tracking-[-.075em] text-[#b8c2cf] backdrop-blur-[0px]",
                item.tooltipPosition === "top"
                  ? "bottom-full left-1/2 -translate-x-1/2 -translate-y-1/3 transform"
                  : "left-full top-1/2 ml-2 -translate-y-1/2 transform",
                "opacity-0 md:group-hover:opacity-100",
              )}
            >
              {item.label}
            </p>
            <item.icon
              onClick={() => router.push(item.path)}
              className={cn(
                path === item.path ? "text-[#ffde24]" : "text-[#576B87]",
                "h-5 w-5 cursor-pointer",
              )}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
