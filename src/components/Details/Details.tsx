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
    <div className=" md:w-[23vw] mb-[4rem]   md:h-[59rem] md:mb-[1rem] rounded-[15px] transition-all  overflow-hidden duration-300 md:mr-3 ease-in-out md:hover:w-[37vw] flex flex-col items-center  rounded-t-[15px] w-screen   bg-black">
      <div className="flex w-full pt-2  justify-evenly md:px-4 flex-row">
        {!loading && !isMovie && (
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
      <hr className="w-[93%]    border-1 border-[#A4B3C9]" />
      <div className="flex flex-col md:pr-0.5  w-full">
        {activeSection === "Overview" && (
          <Overview loading={loading} item={loading ? {} : item} />
        )}
        {!isMovie && activeSection === "Episodes" && (
          <Episodes loading={loading} item={loading ? {} : item} />
        )}
        {activeSection === "Casts" && (
          <Cast loading={loading} item={loading ? {} : item} />
        )}
        {activeSection === "Reviews" && (
          <Review loading={loading} item={loading ? {} : item} />
        )}
        {activeSection === "Related" && (
          <Related loading={loading} item={loading ? {} : item} />
        )}
      </div>
    </div>
  );
}

export default Details;
