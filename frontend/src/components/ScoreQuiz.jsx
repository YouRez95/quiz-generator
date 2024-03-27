import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { postTheScore } from "../api";

export default function ScoreQuiz({
  quizId,
  answers,
  setAnswers,
  token,
  title,
  numQuestion,
}) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function sendAnswers() {
    if (!answers) {
      return (window.location.href = "/");
    }
    setLoading(true);
    const data = await postTheScore(quizId, token, answers);
    setScore(data);
    setLoading(false);
    setAnswers(null);
  }
  useEffect(() => {
    sendAnswers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex-1 text-dark px-2 pb-10">
        <h1 className="text-center font-secondary font-bold text-lg">
          {title}
        </h1>
        <div className="grid gap-3 font-medium mt-3">
          <div className="flex justify-between items-center px-5 py-3 border-y border-dark-3">
            <span className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="css-i6dzq1"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01 9 11.01"></path>
              </svg>
              CORRECT
            </span>
            <span className="result-count">{score.correct}</span>
          </div>
          <div className="flex justify-between items-center px-5 border-dark-3">
            <span className="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="css-i6dzq1"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M15 9L9 15"></path>
                <path d="M9 9L15 15"></path>
              </svg>
              WRONG
            </span>
            <span className="result-count">{score.wrong}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          <p className="text-md text-center font-medium">
            {score.correct === numQuestion &&
              "Congratulations on getting everything right! Learning never stops. Ready to test yourself on another quiz?"}

            {score.correct > score.wrong &&
              score.wrong > 0 &&
              "Awesome job! You answered most of the questions. Want to give it another shot and see if you can get a perfect score?"}

            {score.wrong >= score.correct &&
              "Hey there, no worries! Learning is all about trying. Why not play again and see if you can improve your score?"}
          </p>

          <div className="flex justify-center items-center gap-5">
            <button
              className="bg-dark text-light px-4 py-2 rounded-lg"
              onClick={() => {}}
            >
              Play Again
            </button>
            <button
              className="border border-dark px-4 py-2 rounded-lg"
              onClick={() => navigate("/")}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
