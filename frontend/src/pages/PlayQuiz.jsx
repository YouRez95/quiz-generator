import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../store/user-context";
import Loading from "../components/Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
import { IoCheckmark } from "react-icons/io5";
import ScoreQuiz from "../components/ScoreQuiz";
import { getQuizAndQuestions } from "../api";

export default function PlayQuiz() {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [finish, setFinish] = useState(false);

  async function handleQuizAndQuestions() {
    const data = await getQuizAndQuestions(id, token);
    const { quiz, questions: dataQuestions } = data;
    setQuiz(quiz);
    setQuestions(dataQuestions);
    setLoading(false);
  }

  function handleNextQuestion() {
    setAnswers((prev) => [
      ...prev,
      { _id: questions[questionIndex]._id, answer: selectedAnswer },
    ]);
    if (questionIndex !== quiz.numQuestion - 1) {
      setSelectedAnswer("");
      setQuestionIndex((prev) => prev + 1);
    } else {
      setFinish(true);
      setStart(false);
    }
  }

  useEffect(() => {
    if (token) {
      handleQuizAndQuestions();
    }
  }, [token]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-white flex p-2 flex-col justify-center items-center">
      {!start && !finish && (
        <div className="bg-dark flex flex-col items-center max-w-[900px] w-full m-2 p-2 text-light rounded-lg">
          <div>
            <h2 className="font-secondary font-bold text-xl text-center my-2">
              {quiz.title}
            </h2>
            <p className="text-white font-light text-center text-sm my-8">
              {quiz.description}
            </p>
          </div>
          <div className="rounded-lg overflow-hidden h-[200px] w-[200px] shadow-md shadow-dark-2">
            <img
              src={BASE_URL + "/" + quiz.backImage}
              className="object-cover w-full h-full"
              alt={quiz.title}
            />
          </div>
          <div className="my-10">
            <button
              className="bg-light text-dark px-3 py-1 rounded-md lg:px-5 lg:py-2"
              onClick={() => setStart(true)}
            >
              Start Playing
            </button>
          </div>
        </div>
      )}

      {start && (
        <div className="bg-dark flex flex-col items-center max-w-[900px] w-full m-2 p-2 text-light rounded-lg">
          <p className="text-dark-3 text-thin font-secondary text-sm">
            question {questionIndex} out of {quiz.numQuestion}
          </p>

          <div className="text-white my-10 flex flex-col justify-center items-center w-full">
            <h2 className="w-[70%] text-center">
              {questions[questionIndex].question}
            </h2>

            <ul className="grid gap-4 grid-cols-1 mt-10 w-full place-items-center">
              {questions[questionIndex].options.map((opt, index) => (
                <li
                  key={index}
                  className={`flex items-center w-[90%] justify-between border-white border  py-2 px-3 rounded-md cursor-pointer transition-all  hover:text-white hover:bg-dark-2 ${
                    selectedAnswer === opt
                      ? "bg-dark-2 text-white"
                      : "bg-white text-dark"
                  }`}
                  onClick={() => setSelectedAnswer(opt)}
                >
                  {opt}
                  <span>{selectedAnswer === opt && <IoCheckmark />}</span>
                </li>
              ))}
            </ul>

            <div className="my-10">
              <button
                className="bg-light text-dark px-20 py-2 rounded-md"
                onClick={handleNextQuestion}
              >
                next
              </button>
            </div>
          </div>
        </div>
      )}

      {finish && (
        <ScoreQuiz
          quizId={quiz._id}
          answers={answers}
          token={token}
          title={quiz.title}
          numQuestion={quiz.numQuestion}
          setAnswers={setAnswers}
        />
      )}
    </div>
  );
}
