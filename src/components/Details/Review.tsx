import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/libs/utils";
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
    <div className="w-full h-[880px]  flex overflow-y-auto overflow-x-hidden flex-col">
      {Review.map((review: any) => (
        <div
          key={review.id}
          className="flex w-full h-[250px] rounded-lg  m-2 bg-[#1B1919] flex-col"
        >
          <h1 className="text-[#FFD700] pb-2 pt-2 pl-2">{review.author}</h1>
          <p className={cn(roboto.className, "pl-2  items-center flex")}>
            <Star size={15} color="#FFD700" /> -{review.author_details.rating}
          </p>
          <p className={cn(roboto.className, "pl-2")}>
            {" "}
            {formatDate(review.created_at)}
          </p>
          <p
            className={cn(
              roboto.className,
              "pt-2 pl-2 break-words overflow-y-auto "
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
