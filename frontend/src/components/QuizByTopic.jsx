import React, { Fragment, useEffect, useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import SubTitleQuiz from "./SubTitleQuiz";
import { quizPopular } from "../data";
import Loading from "./Loading";
import { getQuizzesByTopic } from "../api";
import logo from "../assets/logo-single-white.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function QuizByTopic({
  topic,
  setPage,
  dataQuizByTopic,
  loading,
  errorMsg,
  totalDocs,
}) {
  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div>
      <SubTitleQuiz title={topic.topic} icon={topic.icon} />
      {loading && dataQuizByTopic.length === 0 && <Loading />}

      {!loading && dataQuizByTopic.length === 0 && (
        <div className="font-secondary text-center">
          No quizzes created yet, Be the first....
        </div>
      )}
      {dataQuizByTopic.length > 0 && (
        <div className="flex flex-col gap-9">
          {dataQuizByTopic.map((quiz) => (
            <div
              key={quiz._id}
              className="flex flex-col items-stretch md:flex-row gap-3 h-fit min-w-full border-dark-3 border px-2 py-4 rounded-lg"
            >
              <img
                src={`${BASE_URL}/${quiz.backImage}`}
                alt={quiz.title}
                className="w-full max-h-[150px] rounded-md flex-1 object-cover"
              />
              <div className="flex flex-col gap-5 w-full justify-between">
                <div className="flex flex-col w-full gap-3">
                  <h3 className="font-secondary text-[18px] xsm:text-xl font-semibold text-dark">
                    {quiz.title}
                  </h3>
                  <p className="text-[14px] xsm:text-base font-extralight text-dark-2">
                    {quiz.description.substring(0, 150)}...
                  </p>
                </div>
                <div className="flex items-center justify-between flex-col xsm:flex-row">
                  <p className=" text-dark-3 text-sm order-2 xsm:order-1">
                    {quiz.createdAt.substring(0, 10)}
                  </p>
                  <div className="flex gap-4 items-center order-1 xsm:order-2 mb-2 xsm:mb-0">
                    <p className="bg-dark-3 text-light rounded-full px-3 py-1 text-sm">
                      <span className="font-secondary">{quiz.category[0]}</span>
                    </p>
                    <button className="px-3 py-1 rounded-full min-w-[90px] text-light bg-dark">
                      <span className="font-secondary">Play</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {dataQuizByTopic.length > 0 && totalDocs !== dataQuizByTopic.length && (
        <div className="flex justify-center items-center my-20">
          <button
            disabled={loading}
            className="border border-dark bg-dark text-white px-4 py-1 rounded-lg flex justify-center items-center gap-2"
            onClick={() => setPage((prev) => prev + 1)}
          >
            {loading && (
              <img src={logo} alt="spinner" className="size-3 animate-spin" />
            )}
            {loading ? "loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
