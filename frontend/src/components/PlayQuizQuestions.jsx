import { useCallback } from "react";
import { IoCheckmark } from "react-icons/io5";

export default function PlayQuizQuestions({
  questions,
  selectedAnswer,
  setSelectedAnswer,
}) {
  let shuffledQuestions = [];

  useCallback(() => {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  }, questions);

  return (
    <ul className="mt-6 grid gap-3">
      {shuffledQuestions.map((qst) => (
        <li
          key={qst.id}
          className={`flex items-center justify-between border border-dark-3 py-2 px-3 rounded-md cursor-pointer transition-all hover:bg-dark-3 ${
            selectedAnswer === qst.question && "bg-dark-3"
          }`}
          onClick={() => setSelectedAnswer(qst.question)}
        >
          {qst.question}
          <span>{selectedAnswer === qst.question && <IoCheckmark />}</span>
        </li>
      ))}
    </ul>
  );
}
