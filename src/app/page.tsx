import ImageHeader from "@/components/Mainpage/ImageHeader";
import AllStuff from "@/components/Mainpage/AllStuff";

import Slider from "@/components/Mainpage/Slider";
export default function Homepage() {
  return (
    <div className="  w-full h-full ">
      <div className="w-full h-full  pl-[70px]">
        <ImageHeader />
        <AllStuff />
      </div>
    </div>
  );
}
