import React, { useRef, useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { quizPopular } from "../data";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
// import { BiSolidLike } from "react-icons/bi";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import SubTitleQuiz from "./SubTitleQuiz";

export default function QuizPopular() {
  const widthRef = useRef();

  function handleScrollRight(e) {
    widthRef.current.scrollLeft += 500;
    console.log(widthRef);
  }

  function handleScrollLeft(e) {
    widthRef.current.scrollLeft -= 500;
  }

  return (
    <div className="relative">
      <SubTitleQuiz icon={HiTrendingUp} title={"Popular Quiz"} />
      <div
        className="absolute bg-[#FFA701] cursor-pointer w-10 h-10 -right-6 z-10 top-[50%] flex items-center justify-center translate-y-[-50%]"
        onClick={handleScrollRight}
      >
        <IoIosArrowDropright className="text-3xl" />
      </div>

      <div
        className="absolute bg-[#FFA701] cursor-pointer w-10 h-10 -left-6 z-10 top-[50%] flex items-center justify-center translate-y-[-50%]"
        onClick={handleScrollLeft}
      >
        <IoIosArrowDropleft className="text-3xl" />
      </div>

      <div
        className="flex gap-10 overflow-x-scroll scroll-smooth scrollbar-hide"
        ref={widthRef}
      >
        {quizPopular.map((quiz) => (
          <div
            key={quiz.id}
            className="min-w-[300px] border-b-2 border-t-2 border-black"
          >
            <img src={quiz.img} alt={quiz.title} className=" bg-cover" />
            <h3 className="font-secondary font-semibold uppercase">
              {quiz.title}
            </h3>
            <p className=" font-extralight">
              {quiz.description.substring(0, 50)}...
            </p>
            <div className="flex justify-between items-center h-[3vh] border-t border-x border-black">
              <div className="flex h-full">
                <div className="flex items-center px-2 gap-2 border-r border-black">
                  <BiLike />
                  {quiz.likes}
                </div>
                <div className="flex items-center px-2 gap-2 border-r border-black">
                  {quiz.comments}
                  <GoComment />
                </div>
              </div>
              <div className="px-2 h-full flex items-center gap-2 border-l border-black">
                <IoGameControllerOutline />
                play quiz
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
