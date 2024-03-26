import React from "react";
import SubTitleQuiz from "./SubTitleQuiz";
import { IoIosSearch } from "react-icons/io";
import { topics } from "../data";

export default function Topics({
  topicSelected,
  onChangeTopic,
  setPage,
  setDataQuizByTopic,
}) {
  return (
    <div className="">
      <SubTitleQuiz title={"Search by Topic"} icon={IoIosSearch} />

      <div className="flex flex-wrap gap-3 justify-center">
        {topics.map((topic) => {
          const IconTopic = topic.icon;
          return (
            <button
              onClick={() => {
                onChangeTopic({ topic: topic.topic, icon: topic.icon });
                setPage(1);
                setDataQuizByTopic([]);
              }}
              key={topic.id}
              className={`border relative border-1 text-dark overflow-hidden border-dark-3 group flex gap-2 items-center rounded-full text-sm md:text-[16px] px-3 md:px-4 py-2 ${
                topicSelected.topic === topic.topic && "bg-dark text-light"
              }`}
            >
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
