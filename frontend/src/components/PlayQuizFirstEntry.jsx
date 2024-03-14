export default function PlayQuizFirstEntry({
  title,
  description,
  numQuestion,
  onHandleStartQuiz,
}) {
  return (
    <div className=" relative flex flex-col items-center justify-center ">
      <h1 className="font-secondary text-3xl font-bold">{title}</h1>
      <p className="text-dark-2 font-light mb-7 mt-3">{description}</p>
      <p className="underline">
        The quiz contains {numQuestion} questions and there is no time limit.
      </p>

      <button
        className="bg-dark px-4 py-2 mt-6 text-light shadow-md shadow-dark"
        onClick={onHandleStartQuiz}
      >
        PLAY QUIZ
      </button>
    </div>
  );
}
