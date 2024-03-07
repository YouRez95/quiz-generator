import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../store/user-context";
import FormCreateQuestion from "../components/FormCreateQuestion";
import TotalQuestionLineInCreateQuestionPage from "../components/TotalQuestionLineInCreateQuestionPage";
import { createQuestion } from "../api";

const initialData = {
  question: "",
  correctAnswer: "",
  option1: "",
  option2: "",
  option3: "",
};

export default function CreateQuestions() {
  const { token, user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [questionData, setQuestionData] = useState(initialData);
  const [numQuestion, setNumQuestion] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleSubmitQuestion(e) {
    e.preventDefault();
    try {
      if (
        !questionData.question ||
        !questionData.correctAnswer ||
        !questionData.option1
      ) {
        const error = new Error("Question, Answer, one option is required");
        throw error;
      }

      setLoading(true);
      const options = [
        questionData.option1,
        questionData.option2,
        questionData.option3,
      ];
      const dataToSend = {
        question: questionData.question,
        correctAnswer: questionData.correctAnswer,
        answerOptions: options.filter((option) => option !== ""),
      };

      const resData = await createQuestion(dataToSend, token, id);
      setQuestionData(initialData);
      if (numQuestion === resData.numQuestion || resData.isComplete) {
        navigate("/");
      }
      setLoading(false);
      setErrorMsg(null);
      setNumQuestion((prev) => prev + 1);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message);
    }
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full bg-light h-[100vh] flex flex-col justify-center items-center relative">
      <TotalQuestionLineInCreateQuestionPage
        id={id}
        numQuestion={numQuestion}
      />

      <FormCreateQuestion
        handleSubmitQuestion={handleSubmitQuestion}
        setQuestionData={setQuestionData}
        numQuestion={numQuestion}
        questionData={questionData}
        isLoading={loading}
      />

      {errorMsg && (
        <div className="bg-dark mt-2 text-light font-secondary px-4 py-2">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
