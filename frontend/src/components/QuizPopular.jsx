import React, { useEffect, useRef, useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { LuHeart } from "react-icons/lu";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import SubTitleQuiz from "./SubTitleQuiz";
import Loading from "./Loading";
import { getTheThenPopularQuiz } from "../api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function QuizPopular() {
  const widthRef = useRef();
  const [popularQuiz, setPopularQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleScrollRight() {
    widthRef.current.scrollLeft += 500;
  }

  function handleScrollLeft() {
    widthRef.current.scrollLeft -= 500;
  }

  async function fetchThePopularQuestion() {
    setIsLoading(true);
    const resData = await getTheThenPopularQuiz();
    setPopularQuiz(resData.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchThePopularQuestion();
  }, []);

  return (
    <div className="relative">
      <SubTitleQuiz icon={HiTrendingUp} title={"Popular Quiz"} />

      {isLoading && <Loading />}

      {!isLoading && popularQuiz.length === 0 && (
        <div className="font-secondary text-center">
          No quizzes created yet, Be the first....
        </div>
      )}

      {!isLoading && popularQuiz.length > 0 && (
        <>
          <div
            className="hidden  md:flex absolute group hover:bg-dark border cursor-pointer w-10 h-10 right-6 z-10 top-[20px] items-center justify-center translate-y-[-50%]"
            onClick={handleScrollRight}
          >
            <IoIosArrowDropright className="text-3xl group-hover:text-white text-dark" />
          </div>

          <div
            className="hidden md:flex border absolute group hover:bg-dark cursor-pointer w-10 h-10 right-[70px] z-10 top-[20px] items-center justify-center translate-y-[-50%]"
            onClick={handleScrollLeft}
          >
            <IoIosArrowDropleft className="text-3xl group-hover:text-white text-dark" />
          </div>

          <div
            className="flex gap-3 sm:gap-6 overflow-x-scroll scroll-smooth scrollbar-hide p-3 mr-2"
            ref={widthRef}
          >
            {popularQuiz.map((quiz) => (
              <div
                key={quiz._id}
                className="cursor-pointer group grid gap-2 sm:gap-4 px-3 border border-dark-3 py-3 rounded-lg"
              >
                <div className=" w-[150px] xsm:w-[200px] md:w-[240px] h-[120px] xsm:h-[170px] md:h-[200px] relative bg-dark-3 overflow-hidden rounded-lg">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={BASE_URL + "/" + quiz.backImage}
                    alt={quiz.title}
                  />
                  <div className="absolute bg-dark opacity-70 top-0 hidden bottom-0 w-full transition-all duration-300 group-hover:block" />
                  <button className="bg-light text-dark uppercase rounded-full text-sm font-secondary font-bold h-fit py-2 px-7 absolute top-[50%] left-[50%] translate-x-[-50%] hidden group-hover:block">
                    Play
                  </button>
                </div>

                <div className="grid sm:gap-2 md:gap-0">
                  <h2 className=" text-[13px] xsm:text-sm md:text-[16px] font-secondary font-bold">
                    {quiz.title}
                  </h2>
                  <p className="text-[13px] xsm:text-sm font-light capitalize text-dark-2">
                    {quiz.description.substring(0, 30)}...
                  </p>
                  <div className="flex flex-col xsm:flex-row items-center justify-between">
                    <div className="flex gap-3">
                      <div className="flex gap-1 items-center">
                        <LuHeart />
                        <span>{quiz.totalLikes}</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <GoComment />
                        <span>{quiz.totalComments}</span>
                      </div>
                    </div>
                    <p className="text-[13px] xsm:text-sm text-dark-2 font-light">
                      Created by{" "}
                      <span className="font-secondary font-bold">
                        {quiz.user.username}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
