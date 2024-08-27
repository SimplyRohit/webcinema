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
    },
  ];

  return (
    <div className="fixed left-0 top-[30%] pl-2 z-50 h-full">
      <nav className="flex flex-col items-center rounded-[10px] justify-evenly w-[54px] h-[420px] backdrop-blur-sm bg-opacity-50 bg-[#000000]">
        {navItems.map((item, index) => (
          <div key={index} className="relative group">
            <p
              className={cn(
                roboto.className,
                "  absolute inline-block whitespace-nowrap opacity-0  p-2 bg-opacity-60 backdrop-blur-[0px] rounded-[6px] bg-[#4d4747] text-[#b8c2cf] text-[.9rem] tracking-[-.075em]",
                item.tooltipPosition === "top"
                  ? "left-[-50%] top-0 translate -x-[-50%] translate-y-[-120%] group-hover:opacity-100 group-hover:-mt-2"
                  : "left-full top-[50%] translate-y-[-50%] ml-2 group-hover:opacity-100 group-hover:ml-2"
              )}
            >
              {item.label}
            </p>
            <item.icon
              onClick={() => router.push(item.path)}
              className={cn(
                path === item.path ? "text-[#ffde24]" : "text-[#576B87]",
                "w-5 h-5"
              )}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
