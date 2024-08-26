import ImageHeader from "@/components/ImageHeader";
import AllStuff from "@/components/AllStuff";

import Slider from "@/components/Slider";
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
