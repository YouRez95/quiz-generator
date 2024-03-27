import { Link, useNavigate, useParams } from "react-router-dom";
import {
  postQuestionFromDashboard,
  putQuestionFromDashboard,
  getQuestionForSpecificQuiz,
  getSingleQuizToDashboard,
  removeQuestion,
} from "../api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import { FaCheck, FaXmark } from "react-icons/fa6";

function DashboardQuizzesUpdateQuestions({ draft }) {
  const { quizId } = useParams();
  const { token } = useContext(UserContext);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionUpdated, setQuestionUpdated] = useState("");
  const [correctAnswerUpdated, setCorrectAnswerUpdated] = useState("");
  const [optionsUpdated, setOptionsUpdated] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  async function getQuestionsToUpdate() {
    setIsLoading(true);
    let data = [];
    if (draft) {
      const quizAndQuestions = await getSingleQuizToDashboard(quizId, token);
      const questions = quizAndQuestions.data.questions;
      const quiz = quizAndQuestions.data.quiz;
      const totalQuestion = quiz.numQuestion;
      for (let i = 0; i < totalQuestion; i++) {
        if (questions[i]) {
          data.push(questions[i]);
        } else {
          data.push({
            _id: Math.random() * 10,
            question: "",
            correctAnswer: "",
            answerOptions: [""],
          });
        }
      }
    } else {
      data = await getQuestionForSpecificQuiz(quizId, token);
    }
    setQuestionData(data);
    setQuestionUpdated(data[questionIndex].question);
    setCorrectAnswerUpdated(data[questionIndex].correctAnswer);
    setOptionsUpdated(data[questionIndex].answerOptions);
    setIsLoading(false);
  }

  function handleNextQuestion() {
    setQuestionIndex((prev) => prev + 1);
    setSuccessMsg(null);
    setErrorMsg(null);
  }

  function handlePrevQuestion() {
    setQuestionIndex((prev) => prev - 1);
    setSuccessMsg(null);
    setErrorMsg(null);
  }

  async function handleChangeQuestion(questionId) {
    setLoadingUpdate(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    const data = {
      question: questionUpdated,
      correctAnswer: correctAnswerUpdated,
      answerOptions: optionsUpdated,
    };
    try {
      let resData;
      if (typeof questionId === "number" && questionId < 10) {
        resData = await postQuestionFromDashboard(quizId, data, token);
      } else {
        resData = await putQuestionFromDashboard(
          quizId,
          data,
          token,
          questionId
        );
      }

      setQuestionData((prev) => {
        const copiedData = [...prev];
        const index = copiedData.findIndex(
          (question) => question._id === questionId
        );
        copiedData[index] = { ...copiedData[index], ...data };
        return copiedData;
      });

      if (resData._id) {
        setQuestionData((prev) => {
          const copiedData = [...prev];
          copiedData[copiedData.length - 1]._id = resData._id;
          return copiedData;
        });
      }
      setSuccessMsg(resData.message);
      console.log(questionData);
      setLoadingUpdate(false);
    } catch (err) {
      setErrorMsg(err.message);
      setLoadingUpdate(false);
    }
  }

  function handleAddOption() {
    setOptionsUpdated((prev) => [...prev, undefined]);
  }

  function handleRemoveOption() {
    setOptionsUpdated((prev) => {
      const newOptions = [...prev];
      newOptions.pop();
      return newOptions;
    });
  }

  function handleAddQuestion() {
    if (questionData.length >= 10) {
      setErrorMsg("Each quiz should contain maximum 10 questions");
    } else {
      setQuestionData((prev) => [
        ...prev,
        {
          _id: Math.random() * 10,
          question: "",
          correctAnswer: "",
          answerOptions: [""],
        },
      ]);
      setQuestionIndex((prev) => prev + 1);
    }
  }

  async function handleRemoveQuestion(questionId) {
    try {
      if (typeof questionId === "string") {
        const resData = await removeQuestion(quizId, questionId);
        setSuccessMsg(resData.message);
      }

      setQuestionData((prev) => {
        const newData = [...prev];
        newData.splice(questionIndex, 1);
        return newData;
      });
      if (questionIndex === questionData.length - 1) {
        setQuestionIndex((prev) => prev - 1);
      } else {
        setQuestionUpdated(questionData[questionIndex + 1].question);
        setCorrectAnswerUpdated(questionData[questionIndex + 1].correctAnswer);
        setOptionsUpdated(questionData[questionIndex + 1].answerOptions);
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (questionData.length > 0) {
      setQuestionUpdated(questionData[questionIndex].question);
      setCorrectAnswerUpdated(questionData[questionIndex].correctAnswer);
      setOptionsUpdated(questionData[questionIndex].answerOptions);
    }
  }, [questionIndex]);

  useEffect(() => {
    if (token) {
      getQuestionsToUpdate();
    }
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-20 mb-20">
      <div className="flex justify-center items-center">
        <ul className="flex justify-center gap-10 relative w-fit">
          {questionData.map((question, index) => (
            <li
              key={question._id}
              className={`w-8 h-8 grid place-items-center border border-dark rounded-full ${
                index > questionIndex
                  ? "bg-white text-dark"
                  : "bg-dark-2 text-white"
              }`}
            >
              {index + 1}
            </li>
          ))}
          <div className="absolute bg-dark w-full h-[1px] top-[50%] translate-y-[–50%] z-[-1]" />
        </ul>
      </div>
      <div className="border w-[90vw] sm:w-[90%] p-5 text-dark rounded-lg">
        <div className="my-2 flex justify-between">
          <Link
            to=".."
            className="bg-white border border-dark text-dark px-3 py-2"
          >
            Back
          </Link>
          {questionData.length > 1 && (
            <button
              className="bg-white border border-dark text-dark px-3 py-2"
              onClick={() =>
                handleRemoveQuestion(questionData[questionIndex]._id)
              }
            >
              Delete Question
            </button>
          )}
          {questionIndex >= questionData.length - 1 && (
            <button
              className="bg-white border border-dark text-dark px-3 py-2"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
          )}
        </div>
        <div className="font-secondary grid grid-cols-1 3xl:grid-cols-[200px_minmax(500px,_1fr)]">
          <label className="font-bold text-2xl" htmlFor="question">
            Question :{" "}
          </label>
          <input
            className=" outline-none border-b max-w-[600px] w-[100%] font-bold  px-2 py-2"
            id="question"
            type="text"
            value={questionUpdated}
            onChange={(e) => setQuestionUpdated(e.target.value)}
          />
        </div>
        <ul className="grid gap-5 mt-5">
          <li className="font-secondary grid grid-cols-1 3xl:grid-cols-[200px_minmax(500px,_1fr)]">
            <label className="font-bold" htmlFor="correct-answer">
              Correct answer :{" "}
            </label>
            <input
              className=" outline-none border-b max-w-[600px] w-[100%] bg-light px-2 py-2"
              id="correct-answer"
              type="text"
              value={correctAnswerUpdated}
              onChange={(e) => setCorrectAnswerUpdated(e.target.value)}
            />
          </li>
          {optionsUpdated.map((option, index) => (
            <li
              key={`${option}-${index}`}
              className="font-secondary grid grid-cols-1 3xl:grid-cols-[200px_minmax(500px,_1fr)]"
            >
              <label className="font-bold" htmlFor={`option-${index}`}>
                Option {index + 1} :{" "}
              </label>
              <input
                className=" outline-none border-b max-w-[600px] w-[100%] bg-red bg-opacity-50 px-2 py-2"
                id={`option-${index}`}
                type="text"
                defaultValue={option}
                onBlur={(e) => {
                  const newOptions = [...optionsUpdated];
                  newOptions[index] = e.target.value;
                  setOptionsUpdated(newOptions);
                }}
              />
            </li>
          ))}
        </ul>

        <div className="my-10 grid grid-cols-2 justify-center gap-5">
          {optionsUpdated.length < 3 && (
            <button
              className="bg-white border border-dark text-dark px-3 py-2"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          )}

          {optionsUpdated.length > 1 && (
            <button
              className="bg-white border border-dark text-dark px-3 py-2"
              onClick={handleRemoveOption}
            >
              Remove Option
            </button>
          )}

          <button
            className="bg-dark text-light px-3 py-2"
            onClick={() =>
              handleChangeQuestion(questionData[questionIndex]._id)
            }
          >
            {loadingUpdate ? "Loading ..." : "Update Question"}
          </button>
          {questionIndex > 0 && (
            <button
              className="bg-light border border-dark text-dark px-3 py-2"
              onClick={handlePrevQuestion}
            >
              Prev Question
            </button>
          )}
          {questionIndex + 1 < questionData.length && (
            <button
              className="bg-light border border-dark text-dark px-3 py-2"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
      {errorMsg && (
        <p className="border bg-light w-fit px-6 py-2 flex items-center gap-2">
          <FaXmark className="w-5 h-5 p-[1px] border rounded-full" />
          {errorMsg}
        </p>
      )}
      {successMsg && (
        <p className="border bg-light w-fit px-6 py-2 flex items-center gap-2">
          <FaCheck className="w-5 h-5 p-[1px] border rounded-full" />
          {successMsg}
        </p>
      )}
    </div>
  );
}

export default DashboardQuizzesUpdateQuestions;
