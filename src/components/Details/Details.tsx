import React, { useState } from "react";
import Overview from "./Overview";
import Episodes from "./Episodes";
import Cast from "./Cast";
import Review from "./Review";
import Related from "./Related";
function Details(props: any) {
  const { item, loading } = props;
  const [activeSection, setActiveSection] = useState("Overview");

  const isMovie = !!item.title;

  return (
    <div className="flex flex-col items-center  rounded-t-[15px] w-screen md:w-full h-full md:mt-4 bg-black">
      <div className="flex w-full pt-2  justify-evenly md:px-4 flex-row">
        {!isMovie && (
          <h1
            className={`text-[16px] cursor-pointer ${
              activeSection === "Episodes" ? "text-[#FFD700]" : ""
            }`}
            onClick={() => setActiveSection("Episodes")}
          >
            Episodes
          </h1>
        )}
        <h1
          className={`text-[16px] cursor-pointer ${
            activeSection === "Overview" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Overview")}
        >
          Overview
        </h1>
        <h1
          className={`text-[16px] cursor-pointer ${
            activeSection === "Casts" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Casts")}
        >
          Casts
        </h1>
        <h1
          className={`text-[16px] cursor-pointer ${
            activeSection === "Reviews" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Reviews")}
        >
          Reviews
        </h1>
        <h1
          className={`text-[16px] cursor-pointer ${
            activeSection === "Related" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Related")}
        >
          Related
        </h1>
      </div>
      <hr className="w-[93%]   border-1 border-[#A4B3C9]" />
      <div className="flex flex-col md:pr-0.5  w-full">
        {activeSection === "Overview" && <Overview item={item} />}
        {!isMovie && activeSection === "Episodes" && <Episodes item={item} />}
        {activeSection === "Casts" && <Cast item={item} />}
        {activeSection === "Reviews" && <Review item={item} />}
        {activeSection === "Related" && <Related item={item} />}
      </div>
    </div>
  );
}

export default Details;
