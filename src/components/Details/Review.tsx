import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
function Review(props: any) {
  const [Review, setReview] = useState([] as any);

  const { item } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${item.name ? "tv" : "movie"}/${
            item.id
          }/reviews?api_key=21adfad015207a4c85a59b73ff60ddec&language=en-US&page=1`
        );
        setReview(response.data.results);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [item]);
  return (
    <div className="w-full h-[880px]  flex overflow-y-auto overflow-x-hidden flex-col">
      {Review.map((review: any) => (
        <div className="flex w-full h-[250px] rounded-lg  m-2 bg-[#1B1919] flex-col">
          <h1 className="text-[#FFD700] pb-2 pt-2 pl-2">{review.author}</h1>
          <p className="pl-2">{review.author_details.rating}</p>
          <p className="pl-2">{review.created_at}</p>
          <p className="pt-2 pl-2 break-words overflow-y-auto ">
            {review.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Review;
