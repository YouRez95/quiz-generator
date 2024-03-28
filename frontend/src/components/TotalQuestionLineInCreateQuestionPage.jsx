import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import { FaCheck } from "react-icons/fa6";
import { getNumberOfQuestion } from "../api";

export default function TotalQuestionLineInCreateQuestionPage({
  id,
  numQuestion,
}) {
  const { token } = useContext(UserContext);
  const [totalQuestion, setTotalQuestion] = useState([]);

  async function fetchTheNumberOfQuestion() {
    try {
      const resData = await getNumberOfQuestion(token, id);

      setTotalQuestion([]);
      for (let i = 1; i <= resData.numOfQuestions; i++) {
        setTotalQuestion((prev) => [...prev, i]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      fetchTheNumberOfQuestion();
    }
  }, [token]);

  return (
    <div className="flex w-[90vw] md:w-[700px]  justify-center items-center m-auto">
      <div
        className={`my-8 flex w-full m-auto sm:w-full relative justify-between mx-2 ${
          totalQuestion.length > 5 ? "" : ""
        }`}
      >
        <div className="w-full h-1 bg-dark absolute top-[50%] left-0 right-0 transform translate-y-[-50%]" />
        {totalQuestion.map((qst) => (
          <div
            key={qst}
            className="bg-dark text-light size-5 rounded-full flex justify-center items-center relative"
          >
            {numQuestion > qst ? (
              <FaCheck />
            ) : (
              <span className="text-sm md:text-base">{qst}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
