import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import { getTheDraftQuiz } from "../api";

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
    <div className="pt-20 grid gap-10">
      <h1 className="text-dark font-secondary text-3xl font-bold">
        Draft
        <span className="text-sm px-2 bg-dark-2 rounded-full font-thin text-light">
          Quiz not completed yet
        </span>
      </h1>

      {isLoading && <Loading />}
      {!isLoading && dataDraft.length === 0 && <div>No Draft Found ... </div>}

      {!isLoading && dataDraft.length > 0 && (
        <div>
          <ul className="flex flex-col gap-10">
            {dataDraft.map((quiz) => (
              <li
                key={quiz._id}
                className="flex gap-6 bg-dark-2 p-3 rounded-lg text-light max-w-[1000px]"
              >
                <div className="max-w-[180px] min-w-[90px] overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={`${BASE_URL}/${quiz.backImage}`}
                    alt={quiz.title}
                  />
                </div>

                <div className="flex flex-col justify-between gap-8 w-full">
                  <div>
                    <h1 className="font-secondary font-bold text-lg">
                      {quiz.title}
                    </h1>
                    <p className="font-thin text-md">
                      {quiz.description.substring(0, 170)}......
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>
                      You've successfully created {quiz.totalQuestionFounded}{" "}
                      out of {quiz.numQuestion} questions for your quiz.
                    </p>
                    <button className="bg-light text-dark px-3 py-1 rounded-full">
                      Continue
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
