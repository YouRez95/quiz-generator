import { useContext, useState } from "react";
import { GoHeart } from "react-icons/go";
import { LiaCommentSolid } from "react-icons/lia";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserContext } from "../store/user-context";
import { deleteQuiz } from "../api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function DashboardCardQuizzes({ quiz, setQuizzes }) {
  const { token } = useContext(UserContext);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [isHover, setIsHover] = useState(false);

  async function handleDeleteQuiz() {
    setQuizzes((prevQuizzes) => {
      return prevQuizzes.filter((qz) => qz._id !== quiz._id);
    });
    await deleteQuiz(quiz._id, token);
  }

  return (
    <li
      key={quiz._id}
      className="w-[250px] flex flex-col justify-between sm:hover:scale-110 transition-all group bg-white py-4 px-2 rounded-lg"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setUpdateBtn(false);
      }}
    >
      <div className="w-full h-[150px] overflow-hidden rounded-lg relative">
        <img
          src={`${BASE_URL}/${quiz.backImage}`}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="bg-dark opacity-50 absolute w-full h-full top-0 bottom-0 hidden group-hover:block" />
        <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-light text-dark font-secondary px-4 py-2 hidden group-hover:block hover:bg-dark-2 hover:text-light">
          See Demo
        </button>
        <button
          className="absolute top-2 right-2 bg-light size-6 text-xl flex items-center justify-center rounded-full hover:bg-dark-2 hover:text-light"
          onClick={handleDeleteQuiz}
        >
          <AiOutlineDelete />
        </button>
      </div>

      <div className="mt-2">
        <h2 className="font-secondary font-bold text-md text-dark">
          {quiz.title}
        </h2>
        <p className="font-light text-dark-2 text-sm">
          {quiz.description.substring(0, 50)}...
        </p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <p className="text-md">{quiz.totalLikes}</p>
            <GoHeart className="text-md" />
          </div>
          <div className="flex items-center gap-1">
            <p className="text-md">{quiz.totalComments}</p>
            <LiaCommentSolid className="text-md" />
          </div>
        </div>

        {/* <Link
        to={`update/${quiz._id}`}
        className="bg-dark text-light border border-dark text-md px-2 py-1 font-secondary hover:bg-light hover:text-dark"
      >
        Update Quiz
      </Link> */}
        <div className="bg-light relative">
          <button
            className="flex items-center gap-3 bg-dark text-light px-3 py-1"
            onClick={() => setUpdateBtn((prev) => !prev)}
          >
            <FiEdit2 className="" /> <IoIosArrowDown />
          </button>
          {updateBtn && isHover && (
            <div className="absolute z-20 right-0 flex flex-col text-[15px] bg-light w-fit border">
              <Link
                to={`update/${quiz._id}`}
                className="p-2 font-secondary font-medium hover:bg-dark-2 hover:text-light"
              >
                Quiz
              </Link>
              <Link
                to={`update/${quiz._id}/questions`}
                className="p-2 font-secondary font-medium hover:bg-dark-2 hover:text-light"
              >
                Questions
              </Link>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
