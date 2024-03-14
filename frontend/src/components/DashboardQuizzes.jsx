import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import { GoHeart } from "react-icons/go";
import { LiaCommentSolid } from "react-icons/lia";
import Loading from "./Loading";
import { getMyQuizzesInDashboard } from "../api";
import { Link } from "react-router-dom";

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
                  src={`http://localhost:5000/${quiz.backImage}`}
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
// backImage
// :
// "quizBackground/2024-03-02T15:55:02.237Z-mathsquiz.jpeg"
// category
// :
// ['Mathematics']
// createdAt
// :
// "2024-03-02T15:55:02.239Z"
// description
// :
// "description created by youness 🏁🏁"
// isComplete
// :
// true
// numQuestion
// :
// 3
// publicQuiz
// :
// true
// title
// :
// "Quiz maths created by youness 😍"
// totalComments
// :
// 9
// totalLikes
// :
// 10
// updatedAt
// :
// "2024-03-02T15:55:50.312Z"
// userId
// :
// "65e34b2df560473b20f87e24"
// __v
// :
// 0
// _id
// :
// ("65e34bd6f560473b20f87e2d");

{
  /* <div className="relative z-10 flex justify-end m-3">
              <div className="relative flex justify-center items-center">
                <GoHeart className="text-dark w-10 h-10 p-1 rounded-full" />
                <span className="absolute top-[55%] translate-y-[-50%] text-dark-2 left-[40%] text-sm">
                  5
                </span>
              </div>
            </div>
            <img
              className="absolute w-full h-full top-0 bottom-0 right-0 left-0 bg-cover"
              src={`http://localhost:5000/${quiz.backImage}`}
              alt={quiz.title}
            />
            <div className="relative flex flex-col h-full justify-end">
              <div className="bg-dark w-full h-[100px] flex flex-col gap-3 p-4 text-light rounded-t-2xl">
                <h3 className="font-secondary font-medium text-lg">
                  {quiz.title}
                </h3>
                <p className="text-sm font-extralight">
                  {quiz.description.substring(0, 70)}
                </p>
              </div>
            </div> */
}
