import React from "react";

function Overview(props: any) {
  const { item } = props;
  return (
    <div className="p-5">
      <h1 className="p-1 pt-5">Title: {item.title || item.name}</h1>
      <p className=" font-mono">{item.overview || "No overview available"}</p>
      <h1 className="p-1 pt-5">Release Date</h1>
      <p className="font-mono">{item.release_date || item.first_air_date}</p>
      <h1 className="p-1 pt-5">Genre</h1>
      <p className="font-mono">
        {item.genres?.map((genre: any) => genre.name).join(", ")}
      </p>
      <h1 className="p-1 pt-5">Show Details</h1>
      <p className="font-mono">{item.status}</p>
      <h1 className="p-1 pt-5">Spoken Language</h1>
      <p className="font-mono">
        {item.spoken_languages?.map((lang: any) => lang.name).join(", ")}
      </p>
      <h1 className="p-1 pt-5">Production Company</h1>
      <p className="font-mono">
        {item.production_companies
          ?.map((company: any) => company.name)
          .join(", ")}
      </p>
      <h1 className="p-1 pt-5">Production Country</h1>
      <p className=" font-mono">
        {item.production_countries
          ?.map((country: any) => country.name)
          .join(", ")}
      </p>
    </div>
  );
}

export default Overview;