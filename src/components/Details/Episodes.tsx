import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

function Episodes(props: any) {
  const { item } = props;

  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1 as any);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const id = item.id;
      axios
        .post(`api/details/episodes`, { id, selectedSeason })
        .then((response) => {
          setEpisodes(response.data.episodes || []);
          setLoading(false);
        });
    }
  }, [selectedSeason, item]);

  const handleSeasonChange = (event: any) => {
    setSelectedSeason(Number(event.target.value));
  };

  return (
    <div className="">
      <div className="flex w-full items-center justify-center pb-5 pt-2">
        {loading
          ? ""
          : seasons.length > 0 && (
              <select
                id="season"
                onChange={handleSeasonChange}
                value={selectedSeason}
                className="m-2 min-w-[250px] max-w-[250px] rounded-[10px] bg-[#1B1919] px-5 py-2 font-mono text-[#A4B3C9]"
              >
                {seasons.map((season: any, index) => (
                  <option key={index} value={season.season_number}>
                    Season - {season.season_number}
                  </option>
                ))}
              </select>
            )}
      </div>

      <div className="flex h-[800px] w-full flex-col overflow-y-auto p-2">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="mb-5 flex min-h-[200px] w-full flex-row bg-[#1B1919]"
              >
                <div className="shimmer max-w-[40%] p-2">
                  <Image
                    className="h-full w-full rounded-[10px] object-cover"
                    src={""}
                    width={200}
                    height={200}
                    alt={""}
                  />
                </div>

                <div className="ml-3 flex min-w-[50%] flex-col py-2">
                  <h1 className="pb-1 pt-2 font-bold">Ep No ....</h1>
                  <p className="pb-2">12.. min</p>
                  <Link
                    className={cn(
                      "mb-2 flex w-[150px] rounded-[5px] bg-[#FFD700] pl-10",
                    )}
                    href={""}
                  >
                    Watch
                    <Play className="w-5 fill-[#000000]" />
                  </Link>
                  <div className="overflow-hidden">
                    <p className="text-ellipsis whitespace-normal">
                      {"......."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : episodes.map((episode: any) => (
              <div
                key={episode.id}
                className="mb-5 flex min-h-[200px] w-full flex-row bg-[#1B1919]"
              >
                <div className="max-w-[40%] p-2">
                  <Image
                    className="h-full w-full rounded-[10px] object-cover"
                    src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
                    width={200}
                    height={200}
                    alt={episode.name}
                    unoptimized
                  />
                </div>

                <div className="ml-3 flex min-w-[50%] flex-col py-2">
                  <h1 className="pb-1 pt-2 font-bold">
                    Ep {episode.episode_number} - {episode.name}
                  </h1>
                  <p className="pb-2">
                    {episode.vote_average} {episode.runtime} min
                  </p>
                  <Link
                    className={cn(
                      "mb-2 flex w-[150px] rounded-[5px] bg-[#FFD700] pl-10",
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
