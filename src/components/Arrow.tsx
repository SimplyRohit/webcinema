import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
function Arrow(props: any) {
  return (
    <div className="mb-2 flex h-full w-full items-center justify-center space-x-2 md:pr-[150px]">
      <ChevronLeft
        onClick={() => {
          props.count > 1 && props.setCount(props.count - 1);
        }}
        className="h-6 w-6 rounded-[50%] bg-[#576B87]"
      />
      <h1
        className={cn(
          "rounded-[10px] bg-[#ffc31e] px-3 text-[20px] text-[#000000]",
        )}
      >
        {props.count}
      </h1>
      <ChevronRight
        onClick={() => props.setCount(props.count + 1)}
        className="h-6 w-6 rounded-[50%] bg-[#576B87]"
      />
    </div>
  );
}

export default Arrow;
