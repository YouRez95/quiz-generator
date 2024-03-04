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
    <div
      className={`-mt-10 mb-10 flex relative ${
        totalQuestion > 5 ? "gap-9" : "gap-20"
      }`}
    >
      <div className="w-full h-1 bg-dark absolute top-[50%] transform translate-y-[-50%]" />
      {totalQuestion.map((qst) => (
        <div
          key={qst}
          className="bg-dark text-light w-7 h-7 rounded-full flex justify-center items-center relative"
        >
          {numQuestion > qst ? <FaCheck /> : <span>{qst}</span>}
        </div>
      ))}
    </div>
  );
}
