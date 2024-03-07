import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import { GoHeart } from "react-icons/go";
import { LiaCommentSolid } from "react-icons/lia";
import Loading from "./Loading";
import { getMyQuizzesInDashboard } from "../api";

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
    <div className="pt-20 grid gap-10">
      <h1 className="text-dark font-secondary text-3xl font-bold">Quizzes</h1>

      {isLoading && <Loading />}

      {!isLoading && quizzes.length === 0 ? (
        <div>No quizzes founded</div>
      ) : (
        <ul className="flex flex-wrap justify-center gap-7">
          {quizzes.map((quiz) => (
            <li
              key={quiz._id}
              className={`min-w-[300px] max-w-[300px] p-2 relative rounded-lg flex flex-col justify-between bg-light border border-dark-3`}
            >
              <div className="absolute left-[50%] translate-x-[-50%] border border-dark-3 -top-10 rounded-full w-[110px] bg-dark h-[110px] overflow-hidden">
                <img
                  src={`http://localhost:5000/${quiz.backImage}`}
                  alt=""
                  className="bg-contain w-full h-full"
                />
              </div>

              <div className="mt-20 flex flex-col items-center text-center">
                <h3 className="font-secondary font-medium text-[15px]">
                  {quiz.title}
                </h3>

                <p className="text-sm mt-6">
                  {quiz.description.substring(0, 70)}
                </p>
              </div>
              <div className="mt-7 flex justify-center gap-10 items-center">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-xl">{quiz.totalLikes}</p>
                  <GoHeart className="text-xl" />
                </div>
                <div className="h-full w-[.5px] bg-dark-3 " />
                <div className="flex flex-col justify-center items-center">
                  <p className="text-xl">{quiz.totalComments}</p>
                  <LiaCommentSolid className="text-xl" />
                </div>
              </div>
              <div className="mt-10 bg-dark text-light rounded-full py-3 cursor-pointer font-secondary flex justify-center items-center">
                Update The quiz
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
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
