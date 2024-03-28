import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import { getMyQuizzesInDashboard } from "../api";
import DashboardCardQuizzes from "./DashboardCardQuizzes";
import logo from "../assets/logo-single-white.png";

export default function DashboardQuizzes() {
  const { token } = useContext(UserContext);
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleDashboardQuizzes() {
    try {
      setIsLoading(true);
      const resData = await getMyQuizzesInDashboard(token, page);
      setTotalDocs(resData.numOfQuizzes);
      setQuizzes((prev) => [...prev, ...resData.data]);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (token) {
      handleDashboardQuizzes();
    }
  }, [token, page]);

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <>
      {isLoading && quizzes.length === 0 && <Loading />}

      {!isLoading && quizzes.length === 0 ? (
        <div>No quizzes founded</div>
      ) : (
        <ul className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-10 sm:gap-y-20 mb-40 cursor-pointer">
          {quizzes.map((quiz) => (
            <DashboardCardQuizzes quiz={quiz} setQuizzes={setQuizzes} />
          ))}
        </ul>
      )}

      {quizzes.length > 0 && totalDocs !== quizzes.length && (
        <div className="flex justify-center items-center my-20">
          <button
            disabled={isLoading}
            className="border border-dark bg-dark text-white px-4 py-1 rounded-lg flex justify-center items-center gap-2"
            onClick={() => setPage((prev) => prev + 1)}
          >
            {isLoading && (
              <img src={logo} alt="spinner" className="size-3 animate-spin" />
            )}
            {isLoading ? "loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
