import React, { Fragment, useEffect, useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import SubTitleQuiz from "./SubTitleQuiz";
import { quizPopular } from "../data";
import Loading from "./Loading";
import { getQuizzesByTopic } from "../api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function QuizByTopic({ topic }) {
  const [dataQuizByTopic, setDataQuizByTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleQuizByTopic() {
    setLoading(true);
    try {
      const resData = await getQuizzesByTopic(topic.topic);
      setDataQuizByTopic(resData.data);
      setLoading(false);
    } catch (err) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    handleQuizByTopic();
  }, [topic]);

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div>
      <SubTitleQuiz title={topic.topic} icon={topic.icon} />
      {loading && <Loading />}

      {!loading && dataQuizByTopic.length === 0 && (
        <div className="font-secondary text-center">
          No quizzes created yet, Be the first....
        </div>
      )}
      {!loading && dataQuizByTopic.length > 0 && (
        <div className="flex flex-col gap-9">
          {dataQuizByTopic.map((quiz) => (
            <div
              key={quiz._id}
              className="flex gap-3 min-w-full border-dark-3 border px-2 py-4 rounded-lg"
            >
              <img
                src={`${BASE_URL}/${quiz.backImage}`}
                alt={quiz.title}
                className="w-[200px] h-[150px] bg-cover rounded-md object-cover"
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
                  <p className=" text-dark-3 text-sm">
                    {quiz.createdAt.substring(0, 10)}
                  </p>
                  <div className="flex gap-4 items-center">
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
    </div>
  );
}
