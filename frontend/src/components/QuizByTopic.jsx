import React from "react";
import { MdOutlineQuiz } from "react-icons/md";
import SubTitleQuiz from "./SubTitleQuiz";
import { quizPopular } from "../data";

export default function QuizByTopic() {
  return (
    <div>
      <SubTitleQuiz title={"Other quizzes"} icon={MdOutlineQuiz} />
      <div className="flex flex-col gap-5">
        {quizPopular.map((quiz) => (
          <>
            <div key={quiz.id} className="flex gap-3 min-w-full">
              <img
                src={quiz.img}
                alt={quiz.title}
                className="w-[150px] bg-cover"
              />
              <div className="flex flex-col w-full">
                <h3 className="font-secondary text-xl font-semibold">
                  {quiz.title}
                </h3>
                <p className=" font-extralight">
                  {quiz.description.substring(0, 150)}...
                </p>
                <div className="flex items-center justify-between">
                  <p className=" text-gray-500 text-sm font-medium">
                    Jan 9, 2024
                  </p>
                  <div className="flex gap-4">
                    <p className=" bg-gray-100 rounded-full px-2 py-1 text-gray-500 text-sm font-light">
                      science
                    </p>
                    <button className="bg-black px-2 py-1 rounded-full min-w-[90px] text-white">
                      Play
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-[1px]" />
          </>
        ))}
      </div>
    </div>
  );
}
