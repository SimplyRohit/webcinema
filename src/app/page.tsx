import Navbar from "@/components/Navbar";
import ImageHeader from "@/components/ImageHeader";

export default function Homepage() {
  return (
    <div className="flex w-full h-full">
      <Navbar />
      <div className="flex-1 mr-5">
        <ImageHeader />
      </div>
    </div>
  );
}
