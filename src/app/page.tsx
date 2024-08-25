import Navbar from "@/components/Navbar";
import Image from "next/image";
import ImageHeader from "@/components/ImageHeader";
import Slider from "@/components/Slider";
import AllStuff from "@/components/AllStuff";
export default function Homepage() {
  return (
    <div className=" max-w-screen h-full ">
      <Navbar />
      <div className="w-full h-full pl-[70px]">
        <ImageHeader />
        <AllStuff />
      </div>
    </div>
  );
}
