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
            <button className="border border-1 border-gray-400 flex gap-2 items-center rounded-full px-3 py-2">
              <IconTopic />
              <div>{topic.topic}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
