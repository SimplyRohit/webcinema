import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/libs/utils";

function Episodes(props: any) {
  const { item } = props;

  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1 as any);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (item && item.id) {
      setSeasons(item.seasons || []);
      if (item.seasons && item.seasons.length > 0) {
        setSelectedSeason(item.seasons[0].season_number);
      }
    }
  }, [item]);

  useEffect(() => {
    if (selectedSeason && item && item.id) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${item.id}/season/${selectedSeason}?api_key=21adfad015207a4c85a59b73ff60ddec`
        )
        .then((response) => {
          setEpisodes(response.data.episodes || []);
        })
        .catch((error) => console.error("Error fetching episodes:", error));
    }
  }, [selectedSeason, item]);

  const handleSeasonChange = (event: any) => {
    setSelectedSeason(Number(event.target.value));
  };

  return (
    <div className="p-4">
      <div className="flex items-center pb-5 pt-2 w-full justify-center">
        {seasons.length > 0 && (
          <select
            id="season"
            onChange={handleSeasonChange}
            value={selectedSeason}
            className="min-w-[250px] max-w-[250px] px-5 py-2 m-2 rounded-[10px] bg-[#1B1919] font-mono text-[#A4B3C9]"
          >
            {seasons.map((season: any, index) => (
              <option key={index} value={season.season_number}>
                Season - {season.season_number}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="w-full h-[730px] overflow-y-auto flex flex-col p-2">
        {episodes.map((episode: any) => (
          <div
            key={episode.id}
            className="w-full flex flex-row mb-5 min-h-[200px] bg-[#1B1919]"
          >
            <div className="max-w-[40%] p-2">
              <Image
                className="w-full rounded-[10px] object-cover h-full"
                src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
                width={1920}
                height={1080}
                alt={episode.name}
              />
            </div>

            <div className="flex flex-col min-w-[50%] py-2 ml-3">
              <h1 className="font-bold pt-2 pb-1">
                Ep {episode.episode_number} - {episode.name}
              </h1>
              <p className="pb-2">
                {episode.vote_average} {episode.runtime} min
              </p>
              <Link
                className={cn(
                  "bg-[#FFD700] pl-10 mb-2 rounded-[5px] flex w-[150px]"
                )}
                href={`/watch?id=${item.id}&type=tv&season=${episode.season_number}&episode=${episode.episode_number}`}
              >
                Watch
                <Play className="w-5 fill-[#000000]" />
              </Link>
              <div className="overflow-hidden">
                <p className="text-ellipsis whitespace-normal">
                  {episode.overview.substring(0, 100) + "......."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Episodes;
