import React, { useState } from "react";
import Overview from "./Overview";
import Episodes from "./Episodes";
function Details(props: any) {
  const { item, loading } = props;
  const [activeSection, setActiveSection] = useState("Overview");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>No data found</div>;
  }

  const isMovie = !!item.title;

  return (
    <div className="flex flex-col items-center rounded-[15px] w-screen sm:w-full sm:h-full sm:mt-4 bg-black">
      <div className="flex w-full pt-3 justify-evenly sm:px-4 flex-row">
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
      <div className="flex flex-col sm:pr-0.5 h-full w-full">
        {activeSection === "Overview" && <Overview item={item} />}
        {!isMovie && activeSection === "Episodes" && (
          <Episodes item={item}  />
        )}
        {activeSection === "Casts" && (
          <div className="p-5">
            <h1 className="p-1">Coming Soon</h1>
          </div>
        )}
        {activeSection === "Reviews" && (
          <div className="p-5">
            <h1 className="p-1">Coming Soon</h1>
          </div>
        )}
        {activeSection === "Related" && (
          <div className="p-5">
            <h1 className="p-1">Coming Soon</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
