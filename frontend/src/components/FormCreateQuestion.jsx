import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function FormCreateQuestion({
  handleSubmitQuestion,
  setQuestionData,
  numQuestion,
  questionData,
  isLoading,
}) {
  return (
    <form
      className="text-dark bg-dark border-dark border min-w-[50%] max-w-[700px] p-6 grid gap-10"
      onSubmit={handleSubmitQuestion}
    >
      <h3 className="text-center text-light text-4xl font-secondary font-bold">
        Question {numQuestion}
      </h3>

      <div className="border w-full bg-light">
        <input
          type="text"
          className="w-full outline-none px-2 bg-light py-1 font-medium font-secondary text-xl placeholder:text-sm"
          placeholder="What is the result of 5 multiplied by 7 ?"
          value={questionData.question}
          onChange={(e) =>
            setQuestionData((prev) => ({ ...prev, question: e.target.value }))
          }
        />
      </div>

      <div className="border w-full bg-light relative rounded-full overflow-hidden">
        <input
          type="text"
          className="w-[70%] outline-none px-2 bg-light py-1 font-medium font-secondary text-xl placeholder:text-sm"
          placeholder="The result is 35"
          value={questionData.correctAnswer}
          onChange={(e) =>
            setQuestionData((prev) => ({
              ...prev,
              correctAnswer: e.target.value,
            }))
          }
        />
        <div className="absolute w-[30%] bg-dark-2 h-[90%] right-[2px] top-[2px] text-light flex items-center justify-center gap-3 rounded-2xl font-medium">
          <FaCheck />
          <p>Correct Answer</p>
        </div>
      </div>

      <div className="border w-full bg-light relative rounded-full overflow-hidden">
        <input
          type="text"
          className="w-[70%] outline-none px-2 bg-light py-1 font-medium font-secondary text-xl placeholder:text-sm"
          placeholder="The result is 45"
          value={questionData.option1}
          onChange={(e) =>
            setQuestionData((prev) => ({
              ...prev,
              option1: e.target.value,
            }))
          }
        />
        <div className="absolute w-[30%] bg-dark-2 h-[90%] right-[2px] top-[2px] text-light flex items-center gap-3 justify-center rounded-2xl font-medium">
          <FaXmark />
          <p>Option 1</p>
        </div>
      </div>

      <div className="border w-full bg-light relative rounded-full overflow-hidden">
        <input
          type="text"
          className="w-[70%] outline-none px-2 bg-light py-1 font-medium font-secondary text-xl placeholder:text-sm"
          placeholder="The result is 55"
          value={questionData.option2}
          onChange={(e) =>
            setQuestionData((prev) => ({
              ...prev,
              option2: e.target.value,
            }))
          }
        />
        <div className="absolute w-[30%] bg-dark-2 h-[90%] right-[2px] top-[2px] text-light flex items-center gap-3 justify-center rounded-2xl font-medium">
          <FaXmark />
          <p>Option 2</p>
        </div>
      </div>

      <div className="border w-full bg-light relative rounded-full overflow-hidden">
        <input
          type="text"
          className="w-[70%] outline-none px-2 bg-light py-1 font-medium font-secondary text-xl placeholder:text-sm"
          placeholder="The result is 25"
          value={questionData.option3}
          onChange={(e) =>
            setQuestionData((prev) => ({
              ...prev,
              option3: e.target.value,
            }))
          }
        />
        <div className="absolute w-[30%] bg-dark-2 h-[90%] right-[2px] top-[2px] text-light flex items-center gap-3 justify-center rounded-2xl font-medium">
          <FaXmark />
          <p>Option 3</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          className="bg-light px-20 w-fit py-2 rounded-full font-secondary flex items-center gap-2 font-bold hover border border-light hover:bg-dark hover:text-light"
        >
          Next
          <FaLongArrowAltRight className="text-lg" />
        </button>
      </div>
    </form>
  );
}
