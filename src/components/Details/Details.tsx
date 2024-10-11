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
    <div className="flex w-full flex-col h-full md:hover:w-[40vw] md:w-[20vw] duration-300 transition-all ease-in-out   ">
      <div className="flex flex-row  items-center py-1 mt-3 rounded-lg justify-evenly  bg-black">
        {!loading && !isMovie && (
          <h1
            className={`lg:text-[16px] md:text-[10px] cursor-pointer ${
              activeSection === "Episodes" ? "text-[#FFD700]" : ""
            }`}
            onClick={() => setActiveSection("Episodes")}
          >
            Episodes
          </h1>
        )}
        <h1
          className={`lg:text-[16px] md:text-[10px] cursor-pointer ${
            activeSection === "Overview" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Overview")}
        >
          Overview
        </h1>
        <h1
          className={`lg:text-[16px] md:text-[10px] cursor-pointer ${
            activeSection === "Casts" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Casts")}
        >
          Casts
        </h1>
        <h1
          className={`lg:text-[16px] md:text-[10px] cursor-pointer ${
            activeSection === "Reviews" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Reviews")}
        >
          Reviews
        </h1>
        <h1
          className={`lg:text-[16px] md:text-[10px]  cursor-pointer ${
            activeSection === "Related" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Related")}
        >
          Related
        </h1>
      </div>
      <hr className="w-full  border-1 border-[#A4B3C9]" />
      <div className="flex md:h-[calc(98%-32px)] rounded-lg bg-black w-full h-[60rem]">
        {activeSection === "Overview" && (
          <Overview loading={loading} item={item} />
        )}
        {!isMovie && activeSection === "Episodes" && (
          <Episodes loading={loading} item={item} />
        )}
        {activeSection === "Casts" && <Cast loading={loading} item={item} />}
        {activeSection === "Reviews" && (
          <Review loading={loading} item={item} />
        )}
        {activeSection === "Related" && (
          <Related loading={loading} item={item} />
        )}
      </div>
    </div>
  );
}

export default Details;
