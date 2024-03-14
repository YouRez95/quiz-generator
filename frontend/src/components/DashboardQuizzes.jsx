import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import { GoHeart } from "react-icons/go";
import { LiaCommentSolid } from "react-icons/lia";
import Loading from "./Loading";
import { getMyQuizzesInDashboard } from "../api";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function DashboardQuizzes() {
  const { token } = useContext(UserContext);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleDashboardQuizzes() {
    try {
      setIsLoading(true);
      const resData = await getMyQuizzesInDashboard(token);
      setQuizzes(resData.data);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (token) {
      handleDashboardQuizzes();
    }
  }, [token]);

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && quizzes.length === 0 ? (
        <div>No quizzes founded</div>
      ) : (
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-10  mb-20 cursor-pointer">
          {quizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="w-[250px] flex flex-col justify-between hover:scale-110 transition-all group"
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
                <p className="font-light text-dark-2 text-sm">
                  {quiz.description}
                </p>
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

                <Link
                  to={`update/${quiz._id}`}
                  className="bg-dark text-light border border-dark text-md px-2 py-1 font-secondary hover:bg-light hover:text-dark"
                >
                  Update Quiz
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
