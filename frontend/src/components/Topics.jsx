import React from "react";
import SubTitleQuiz from "./SubTitleQuiz";
import { IoIosSearch } from "react-icons/io";
import { topics } from "../data";

export default function Topics() {
  return (
    <div>
      <SubTitleQuiz title={"Search by Topic"} icon={IoIosSearch} />

      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => {
          const IconTopic = topic.icon;
          return (
            <button className="border relative border-1 text-dark overflow-hidden border-dark-3 group flex gap-2 items-center rounded-full px-3 py-2">
              <div className="absolute w-full h-full bg-dark -left-[100%] transition-all duration-150 top-0 group-hover:left-0" />
              <IconTopic className="relative group-hover:text-light" />
              <div className="relative group-hover:text-light">
                {topic.topic}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
