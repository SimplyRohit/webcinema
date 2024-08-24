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

export default function Navbar() {
  return (
    <div className="fixed left-0 top-[210px] m-2 h-full">
      <nav className="flex flex-col items-center rounded-[10px] justify-evenly w-[54px] h-[420px] backdrop-blur-sm bg-opacity-60 bg-[#000000] mt-[50px]">
        <House className="w-5 h-5 text-[#576B87]" />
        <Search className="w-5 h-5 text-[#576B87]" />
        <CirclePlay className="w-5 h-5 text-[#576B87]" />
        <Monitor className="w-5 h-5 text-[#576B87]" />
        <Cookie className="w-5 h-5 text-[#576B87]" />
        <Drama className="w-5 h-5 text-[#576B87]" />
        <BookCopy className="w-5 h-5 text-[#576B87]" />
        <LibraryBig className="w-5 h-5 text-[#576B87]" />
        <Settings className="w-5 h-5 text-[#576B87]" />
      </nav>
    </div>
  );
}
