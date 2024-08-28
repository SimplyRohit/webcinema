import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/libs/utils";
function Arrow(props: any) {
  return (
    <div className=" flex  items-center space-x-2 justify-center pr-[150px] w-full h-full">
      <ChevronLeft
        onClick={() => {
          props.count > 1 && props.setCount(props.count - 1);
        }}
        className="  bg-[#576B87] rounded-[50%] w-6 h-6"
      />
      <h1
        className={cn(
          " text-[#000000] px-3 rounded-[10px] bg-[#ffc31e] text-[20px]"
        )}
      >
        {props.count}
      </h1>
      <ChevronRight
        onClick={() => props.setCount(props.count + 1)}
        className="bg-[#576B87] rounded-[50%] w-6 h-6"
      />
    </div>
  );
}

export default Arrow;
