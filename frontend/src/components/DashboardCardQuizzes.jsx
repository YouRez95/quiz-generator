import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { LiaCommentSolid } from "react-icons/lia";

const BASE_URL = import.meta.env.VITE_BASE_URL;
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function DashboardCardQuizzes({ quiz }) {
  const [updateBtn, setUpdateBtn] = useState(false);
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      key={quiz._id}
      className="w-[250px] flex flex-col justify-between hover:scale-110 transition-all group"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setUpdateBtn(false);
      }}
    >
      <div className="w-full h-[200px] overflow-hidden rounded-lg relative">
        <img
          src={`${BASE_URL}/${quiz.backImage}`}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="bg-dark opacity-50 absolute w-full h-full top-0 bottom-0 hidden group-hover:block" />
        <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-light text-dark font-secondary px-4 py-2 hidden group-hover:block hover:bg-dark-2 hover:text-light">
          See Demo
        </button>
      </div>

      <div className="mt-2">
        <h2 className="font-secondary font-bold text-md text-dark">
          {quiz.title}
        </h2>
        <p className="font-light text-dark-2 text-sm">{quiz.description}</p>
      </div>
      <div className="flex items-center justify-between">
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
            Update <IoIosArrowDown />
          </button>
          {updateBtn && isHover && (
            <div className="absolute z-20 flex flex-col text-[15px] bg-light w-full border">
              <Link
                to={`update/${quiz._id}`}
                className="pl-1 pt-1 font-secondary font-medium hover:bg-dark-2 hover:text-light"
              >
                Quiz
              </Link>
              <Link
                to={`update/${quiz._id}/questions`}
                className="pl-1 pt-1 font-secondary font-medium hover:bg-dark-2 hover:text-light"
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
