import Navbar from "@/components/Navbar";
import Image from "next/image";
import ImageHeader from "@/components/ImageHeader";
import Slider from "@/components/Slider";
export default function Homepage() {
  return (
    <div className="flex w-full h-full">
      <Navbar />
      <div className="flex-1 mr-5">
        <ImageHeader />
        <div className="ml-[80px] mt-[50px] flex flex-col ">
          <h1 className="font-bold text-[25px] pb-2">Recommendation</h1>
          <Slider />
        </div>
      </div>
    </div>
  );
}
