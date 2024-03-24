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
      className="text-dark bg-dark border-dark m-2 border w-[90vw] md:w-[700px] p-3 grid gap-5 md:gap-10"
      onSubmit={handleSubmitQuestion}
    >
      <h3 className="text-center text-light text-xl sm:text-4xl font-secondary font-bold">
        Question {numQuestion}
      </h3>

      <div className="border w-full bg-light">
        <input
          type="text"
          className="w-full outline-none px-2 py-1 font-medium font-secondary text-sm sm:text-xl placeholder:text-sm"
          placeholder="What is the result of 5 multiplied by 7 ?"
          value={questionData.question}
          onChange={(e) =>
            setQuestionData((prev) => ({ ...prev, question: e.target.value }))
          }
        />
      </div>

      <div className="min-h-[50px] relative md:static">
        <div className="border w-full bg-white static md:relative rounded-full overflow-hidden text-sm sm:text-base">
          <input
            type="text"
            className="w-[100%] md:w-[60%] outline-none px-2 py-1 font-medium font-secondary placeholder:text-sm"
            placeholder="The result is 35"
            value={questionData.correctAnswer}
            onChange={(e) =>
              setQuestionData((prev) => ({
                ...prev,
                correctAnswer: e.target.value,
              }))
            }
          />
          <div className="absolute hidden md:flex w-[40%] bg-dark-2 h-[90%] right-[2px] top-[2px] text-light items-center justify-center gap-3 rounded-2xl font-medium">
            <FaCheck />
            <p>Correct Answer</p>
          </div>
          <p className="absolute flex md:hidden right-1 font-secondary text-[13px] -bottom-[3px] text-dark-3">
            Correct Answer
          </p>
        </div>
      </div>

      <div className="min-h-[50px] relative md:static">
        <div className="border w-full bg-white static md:relative rounded-full overflow-hidden text-sm sm:text-base">
          <input
            type="text"
            className="w-full md:w-[70%] outline-none px-2 py-1 font-medium font-secondary placeholder:text-sm"
            placeholder="The result is 45"
            value={questionData.option1}
            onChange={(e) =>
              setQuestionData((prev) => ({
                ...prev,
                option1: e.target.value,
              }))
            }
          />
          <div className="absolute hidden md:flex w-[30%] bg-dark-2 h-[90%] right-[2px] top-[2px] text-light items-center gap-3 justify-center rounded-2xl font-medium">
            <FaXmark />
            <p>Option 1</p>
          </div>
          <p className="absolute flex md:hidden right-1 font-secondary text-[13px] -bottom-[3px] text-dark-3">
            Option 1
          </p>
        </div>
      </div>

      <div className="min-h-[50px] relative md:static">
        <div className="border w-full bg-white static md:relative rounded-full overflow-hidden text-sm sm:text-base">
          <input
            type="text"
            className="w-full md:w-[70%] outline-none px-2 py-1 font-medium font-secondary placeholder:text-sm"
            placeholder="The result is 55"
            value={questionData.option2}
            onChange={(e) =>
              setQuestionData((prev) => ({
                ...prev,
                option2: e.target.value,
              }))
            }
          />
          <div className="absolute hidden md:flex w-[30%] bg-dark-2 h-[90%] right-[2px] top-[2px] text-light items-center gap-3 justify-center rounded-2xl font-medium">
            <FaXmark />
            <p>Option 2</p>
          </div>
          <p className="absolute flex md:hidden right-1 font-secondary text-[13px] -bottom-[3px] text-dark-3">
            Option 2
          </p>
        </div>
      </div>

      <div className="min-h-[50px] relative md:static">
        <div className="border w-full bg-white static md:relative rounded-full overflow-hidden text-sm sm:text-base">
          <input
            type="text"
            className="w-full md:w-[70%] outline-none px-2 py-1 font-medium font-secondary placeholder:text-sm"
            placeholder="The result is 25"
            value={questionData.option3}
            onChange={(e) =>
              setQuestionData((prev) => ({
                ...prev,
                option3: e.target.value,
              }))
            }
          />
          <div className="absolute hidden md:flex w-[30%] bg-dark-2 h-[90%] right-[2px] top-[2px] text-light items-center gap-3 justify-center rounded-2xl font-medium">
            <FaXmark />
            <p>Option 3</p>
          </div>
          <p className="absolute flex md:hidden right-1 font-secondary text-[13px] -bottom-[3px] text-dark-3">
            Option 3
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          className="bg-light px-20 w-fit py-1 text-sm rounded-full font-secondary flex items-center gap-2 font-bold hover border border-light hover:bg-dark hover:text-light"
        >
          Next
          <FaLongArrowAltRight className="text-lg" />
        </button>
      </div>
    </form>
  );
}
