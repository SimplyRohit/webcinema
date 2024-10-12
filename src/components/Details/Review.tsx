import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
const roboto = Roboto_Mono({ subsets: ["latin"] });
import { Star } from "lucide-react";
function Review(props: any) {
  const [Review, setReview] = useState([] as any);

  const { item } = props;
  const [loading, setLoading] = useState(true);
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  useEffect(() => {
    const fetchData = async () => {
      const name = item.name;
      const id = item.id;
      try {
        const response = await axios.post(`api/details/review`, { id, name });
        setReview(response.data.results);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [item]);
  return (
    <div className="flex h-[880px] w-full flex-col overflow-y-auto overflow-x-hidden">
      {Review.map((review: any) => (
        <div
          key={review.id}
          className="m-2 flex h-[250px] w-full flex-col rounded-lg bg-[#1B1919]"
        >
          <h1 className="pb-2 pl-2 pt-2 text-[#FFD700]">{review.author}</h1>
          <p className={cn(roboto.className, "flex items-center pl-2")}>
            <Star size={15} color="#FFD700" /> -{review.author_details.rating}
          </p>
          <p className={cn(roboto.className, "pl-2")}>
            {" "}
            {formatDate(review.created_at)}
          </p>
          <p
            className={cn(
              roboto.className,
              "overflow-y-auto break-words pl-2 pt-2",
            )}
          >
            {review.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Review;
