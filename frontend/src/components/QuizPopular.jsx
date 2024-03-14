import React, { useEffect, useRef, useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { LuHeart } from "react-icons/lu";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import SubTitleQuiz from "./SubTitleQuiz";
import Loading from "./Loading";
import { getTheThenPopularQuiz } from "../api";

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
            className="absolute bg-dark cursor-pointer w-10 h-10 -right-6 z-10 top-[50%] flex items-center justify-center translate-y-[-50%]"
            onClick={handleScrollRight}
          >
            <IoIosArrowDropright className="text-3xl text-light" />
          </div>

          <div
            className="absolute bg-dark cursor-pointer w-10 h-10 -left-6 z-10 top-[50%] flex items-center justify-center translate-y-[-50%]"
            onClick={handleScrollLeft}
          >
            <IoIosArrowDropleft className="text-3xl text-light" />
          </div>

          <div
            className="flex gap-10 overflow-x-scroll scroll-smooth scrollbar-hide"
            ref={widthRef}
          >
            {popularQuiz.map((quiz) => (
              // <div
              //   key={quiz._id}
              //   className="min-w-[270px] rounded-lg border border-dark-3 p-3 flex flex-col justify-between"
              // >
              //   <img
              //     src={"http://localhost:5000/" + quiz.backImage}
              //     alt={quiz.title}
              //     className="bg-cover bg-center rounded-md h-[150px]"
              //   />

              //   <h3 className="font-secondary font-semibold uppercase text-dark">
              //     {quiz.title}
              //   </h3>
              //   <p className=" font-extralight text-dark-2">
              //     {quiz.description.substring(0, 50)}...
              //   </p>
              //   <div className="flex justify-between items-center h-[3vh] border border-dark-3">
              //     <div className="flex h-full">
              //       <div className="flex items-center px-2 gap-2 border-r border-dark-3">
              //         <BiLike />
              //         <p className="text-dark">{quiz.totalLikes}</p>
              //       </div>
              //       <div className="flex items-center px-2 gap-2 border-r border-dark-3">
              //         <p className="text-dark">{quiz.totalComments}</p>
              //         <GoComment />
              //       </div>
              //     </div>
              //     <div className="px-2 h-full flex items-center gap-2 border-l border-dark-3">
              //       <IoGameControllerOutline />
              //       <p className="text-dark">play quiz</p>
              //     </div>
              //   </div>
              // </div>
              <div key={quiz._id} className="cursor-pointer group grid gap-2">
                <div className="w-[250px] h-[200px] relative bg-dark-3 overflow-hidden rounded-lg">
                  <img
                    className="object-cover w-full h-full object-center"
                    src={"http://localhost:5000/" + quiz.backImage}
                    alt={quiz.title}
                  />
                  <div className="absolute bg-dark opacity-70 top-0 hidden bottom-0 w-full transition-all duration-300 group-hover:block" />
                  <button className="bg-light text-dark uppercase rounded-full text-sm font-secondary font-bold h-fit py-2 px-7 absolute top-[50%] left-[50%] translate-x-[-50%] hidden group-hover:block">
                    Play
                  </button>
                </div>

                <div>
                  <h2 className="text-sm font-secondary font-bold">
                    {quiz.title}
                  </h2>
                  <p className="text-sm font-light capitalize text-dark-2">
                    {quiz.description.substring(0, 30)}...
                  </p>
                  <div className="flex items-center justify-between">
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
                    <p className="text-sm text-dark-2 font-light">
                      Created by{" "}
                      <span className="font-secondary font-bold">Flan</span>
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
