import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import { getTheDraftQuiz } from "../api";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function DashboardDraft() {
  const { token } = useContext(UserContext);
  const [dataDraft, setDataDraft] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  async function handlequizzesDraft() {
    try {
      setIsLoading(true);
      const resData = await getTheDraftQuiz(token);
      setDataDraft(resData.data);
      setIsLoading(false);
    } catch (err) {
      setIsError(err.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      handlequizzesDraft();
    }
  }, [token]);

  if (!token) return <Loading />;

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && dataDraft.length === 0 && <div>No Draft Found ... </div>}

      {!isLoading && dataDraft.length > 0 && (
        <div>
          <ul className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-36">
            {dataDraft.map((quiz) => (
              <li
                key={quiz._id}
                className="flex flex-col justify-between gap-3 bg-white text-dark p-3 rounded-lg w-[250px] max-h-[350px]"
              >
                <div className="overflow-hidden w-full h-[150px] rounded-lg relative">
                  <img
                    className="w-full h-full object-cover"
                    src={`${BASE_URL}/${quiz.backImage}`}
                    alt={quiz.title}
                  />
                </div>

                <div className="flex flex-col justify-between gap-2 w-full">
                  <div>
                    <h1 className="font-secondary font-bold text-lg">
                      {quiz.title}
                    </h1>
                    <p className="font-thin text-md">
                      {quiz.description.substring(0, 50)}.....
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 justify-between items-center">
                    <p className="font-light text-sm">
                      You've successfully created{" "}
                      <span className="font-bold font-secondary">
                        {quiz.totalQuestionFounded}
                      </span>{" "}
                      out of{" "}
                      <span className="font-bold font-secondary">
                        {quiz.numQuestion}
                      </span>{" "}
                      questions for your quiz.
                    </p>
                    <Link
                      to={quiz._id}
                      className="bg-dark text-light text-center font-secondary px-3 py-1 rounded-full w-full"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
