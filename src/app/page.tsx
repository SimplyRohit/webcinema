import ImageHeader from "@/components/Home/ImageHeader";
import AllStuff from "@/components/Home/AllStuff";

import Slider from "@/components/Home/Slider";
export default function Homepage() {
  return (
    <div className="  w-full h-full ">
      <div className="w-full h-full pl-[70px]">
        <ImageHeader />
        {/* <Slider /> */}
        <AllStuff />
      </div>
    </div>
  );
}
