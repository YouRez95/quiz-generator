import React, { Fragment } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import SubTitleQuiz from "./SubTitleQuiz";
import { quizPopular } from "../data";

export default function QuizByTopic() {
  return (
    <div>
      <SubTitleQuiz title={"Other quizzes"} icon={MdOutlineQuiz} />
      <div className="flex flex-col gap-9">
        {quizPopular.map((quiz) => (
          <Fragment key={quiz.id}>
            <div className="flex gap-3 min-w-full border-dark-3 border px-2 py-4 rounded-lg">
              <img
                src={quiz.img}
                alt={quiz.title}
                className="w-[200px] bg-cover rounded-md"
              />
              <div className="flex flex-col w-full justify-between">
                <div className="flex flex-col w-full">
                  <h3 className="font-secondary text-xl font-semibold text-dark">
                    {quiz.title}
                  </h3>
                  <p className=" font-extralight text-dark-2">
                    {quiz.description.substring(0, 150)}...
                  </p>
                </div>
                <div className="flex items-center justify-between ">
                  <p className=" text-dark-3 text-sm">Jan 9, 2024</p>
                  <div className="flex gap-4 items-center">
                    <p className="bg-dark-3 text-light rounded-full px-3 py-1 text-sm">
                      <span className="font-secondary">Science</span>
                    </p>
                    <button className="px-3 py-1 rounded-full min-w-[90px] text-light bg-dark">
                      <span className="font-secondary">Play</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
