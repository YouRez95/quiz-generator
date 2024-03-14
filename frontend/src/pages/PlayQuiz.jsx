import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { IoCheckmark } from "react-icons/io5";
import PlayQuizFirstEntry from "../components/PlayQuizFirstEntry";
import PlayQuizFinished from "../components/PlayQuizFinished";
import { getSingleQuizToPlay } from "../api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PlayQuiz() {
  const { id } = useParams();
  const [gameStarted, setGameStarted] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});
  const [questionsInfo, setQuestionInfo] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [results, setResults] = useState({ wrong: 0, correct: 0 });
  const [finishGame, setFinishGame] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [messageContinueQuiz, setMessageContinueQuiz] = useState("");

  let questions = [];

  async function getSingleQuiz() {
    setIsLoading(true);

    try {
      const { data } = await getSingleQuizToPlay(id);
      setQuizInfo(data.quiz);
      setQuestionInfo(data.questions);
      setIsLoading(false);
    } catch (err) {
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  }

  function handleStartQuiz() {
    setQuestionIndex(0);
    setGameStarted(true);
    if (localStorage.getItem(`quiz-${quizInfo._id}`) !== null) {
      const { results, gameStarted, questionIndex } = JSON.parse(
        localStorage.getItem(`quiz-${quizInfo._id}`)
      );
      setResults(results);
      setGameStarted(gameStarted);
      setQuestionIndex(questionIndex);
      setMessageContinueQuiz(
        "You are already answered some questions on that quiz, continue your quiz"
      );
    }
  }

  function handleNextQuestion() {
    setMessageContinueQuiz("");
    if (selectedAnswer === questionsInfo[questionIndex].correctAnswer) {
      setResults((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setResults((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    if (questionIndex + 1 >= quizInfo.numQuestion) {
      setFinishGame(true);
      localStorage.removeItem(`quiz-${quizInfo._id}`);
    } else {
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
    }
  }

  function handlePlayAgain() {
    setResults({ wrong: 0, correct: 0 });
    setQuestionIndex(0);
    setFinishGame(false);
    setSelectedAnswer("");
  }

  if (!finishGame && questionsInfo.length > 0) {
    questions = [
      { id: 0, question: questionsInfo[questionIndex].correctAnswer },
      ...questionsInfo[questionIndex].answerOptions.map((question, index) => {
        return {
          id: index + 1,
          question,
        };
      }),
    ];
    // questions.sort(() => Math.random() - 0.5);
  }
  // const shuffledQuestions = [...QUESTIONS[activeQuestionIndex].answers];
  // shuffledQuestions.sort(() => Math.random() - 0.5);

  useEffect(() => {
    getSingleQuiz();
  }, []);

  useEffect(() => {
    if (questionIndex > 0) {
      const quizData = { results, gameStarted, questionIndex };
      localStorage.setItem(`quiz-${quizInfo._id}`, JSON.stringify(quizData));
    }
  }, [questionIndex]);

  if (errorMsg) {
    return (
      <div className="w-[100vw] h-[100vh] bg-dark text-light flex items-center justify-center text-4xl font-secondary font-bold">
        {errorMsg}
      </div>
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-dark flex justify-center items-center">
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="bg-light text-dark max-w-[1200px] w-full max-h-[450px] py-16 rounded-lg shadow-lg shadow-light relative overflow-hidden">
          <div className="absolute w-[50%] h-[100%] left-0 bottom-0">
            <img
              className="object-cover w-full h-full"
              src={`${BASE_URL}/${quizInfo.backImage}`}
              alt={quizInfo.title}
            />
            <div
              className={`absolute  w-[100%] h-[100%] left-0 bottom-0 opacity-80 ${
                gameStarted ? "bg-dark" : "bg-light"
              }`}
            />
          </div>
          <span className="absolute top-2 left-2 bg-dark-3 text-dark font-secondary uppercase py-1 px-3 rounded-full">
            {quizInfo.category}
          </span>
          {!gameStarted && (
            <PlayQuizFirstEntry
              title={quizInfo.title}
              numQuestion={quizInfo.numQuestion}
              description={quizInfo.description}
              onHandleStartQuiz={handleStartQuiz}
            />
          )}

          {gameStarted && (
            <div className="relative flex justify-start text-light gap-8">
              <div className="flex-1 text-center grid gap-10">
                <h1 className="text-3xl font-medium font-secondary">
                  {quizInfo.title}
                </h1>

                <div className="flex gap-2 justify-center">
                  {questionsInfo.map((question, index) => (
                    <div
                      key={question._id}
                      className={`w-2 h-2 rounded-full ${
                        questionIndex < index ? "bg-light" : "bg-dark"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {!finishGame ? (
                <div className="flex-1 text-dark px-2 pb-10">
                  <div className="text-sm text-dark text-center -mt-3">
                    {messageContinueQuiz}
                  </div>
                  <h3 className="text-3xl font-medium font-secondary">
                    {questionsInfo[questionIndex].question}
                  </h3>

                  <ul className="mt-6 grid gap-3">
                    {questions.map((qst) => (
                      <li
                        key={qst.id}
                        className={`flex items-center justify-between border border-dark-3 py-2 px-3 rounded-md cursor-pointer transition-all hover:bg-dark-3 ${
                          selectedAnswer === qst.question && "bg-dark-3"
                        }`}
                        onClick={() => setSelectedAnswer(qst.question)}
                      >
                        {qst.question}
                        <span>
                          {selectedAnswer === qst.question && <IoCheckmark />}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="border border-dark my-10 bg-dark w-full py-2 text-light flex items-center justify-center rounded-md transition-all"
                    onClick={handleNextQuestion}
                  >
                    Next Question
                  </button>
                </div>
              ) : (
                <PlayQuizFinished
                  title={quizInfo.title}
                  quizId={quizInfo._id}
                  numQuestion={quizInfo.numQuestion}
                  results={results}
                  handlePlayAgain={handlePlayAgain}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
