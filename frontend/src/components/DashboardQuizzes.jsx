import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import { getMyQuizzesInDashboard } from "../api";
import DashboardCardQuizzes from "./DashboardCardQuizzes";

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
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-20  mb-20 cursor-pointer">
          {quizzes.map((quiz) => (
            <DashboardCardQuizzes quiz={quiz} key={quiz._id} />
          ))}
        </ul>
      )}
    </>
  );
}
