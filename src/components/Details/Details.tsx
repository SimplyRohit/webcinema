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
    <div className="flex h-full w-full flex-col transition-all duration-300 ease-in-out md:w-[20vw] md:hover:w-[40vw]">
      <div className="rounded-x-lg mt-3 flex flex-row items-center justify-evenly rounded-t-lg bg-black py-1">
        {!loading && !isMovie && (
          <h1
            className={`cursor-pointer md:text-[10px] lg:text-[16px] ${
              activeSection === "Episodes" ? "text-[#FFD700]" : ""
            }`}
            onClick={() => setActiveSection("Episodes")}
          >
            Episodes
          </h1>
        )}
        <h1
          className={`cursor-pointer md:text-[10px] lg:text-[16px] ${
            activeSection === "Overview" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Overview")}
        >
          Overview
        </h1>
        <h1
          className={`cursor-pointer md:text-[10px] lg:text-[16px] ${
            activeSection === "Casts" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Casts")}
        >
          Casts
        </h1>
        <h1
          className={`cursor-pointer md:text-[10px] lg:text-[16px] ${
            activeSection === "Reviews" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Reviews")}
        >
          Reviews
        </h1>
        <h1
          className={`cursor-pointer md:text-[10px] lg:text-[16px] ${
            activeSection === "Related" ? "text-[#FFD700]" : ""
          }`}
          onClick={() => setActiveSection("Related")}
        >
          Related
        </h1>
      </div>
      <hr className="border-1 w-full border-[#A4B3C9]" />
      <div className="flex h-[60rem] w-full rounded-b-lg bg-black md:h-[calc(98%-32px)]">
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
