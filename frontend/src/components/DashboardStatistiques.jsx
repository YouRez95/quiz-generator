import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import { getStatistiques } from "../api/index";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function DashboardStatistiques() {
  const { user, token } = useContext(UserContext);
  const [statistiques, setStatistiques] = useState(null);
  const [loading, setLoading] = useState(true);

  async function statistiqueOfUsers() {
    setLoading(true);
    const dataStatistique = await getStatistiques(token);
    setStatistiques(dataStatistique.data);
    setLoading(false);
  }

  useEffect(() => {
    statistiqueOfUsers();
  }, [token]);

  if (!user) return <Loading />;

  return (
    <div className="pb-40">
      <div className="pt-20 font-bold text-xl text-dark flex gap-3">
        Welcome Back, <p className="font-secondary">{user.username}!</p>
      </div>

      {loading && <Loading />}
      {!loading && (
        <div className="mx-3 my-10">
          <div>
            <h2 className="font-secondary font-bold text-xl my-2">
              Your Statistiques:{" "}
            </h2>
            <ul className="flex text-light gap-3 text-lg flex-wrap">
              <li className="bg-dark group h-[100px] shadow-lg shadow-dark-3 rounded-md flex flex-col gap-3 items-center justify-center p-3 relative">
                <span className="font-secondary">Quiz Created</span>
                <span className="font-secondary font-bold">
                  {statistiques.quizCreatedCompleted +
                    statistiques.quizCreatedNotCompleted}
                </span>

                <div className="absolute text-[12px] text-dark flex flex-col gap-2 p-2 opacity-0 group-hover:opacity-100 transition-all bg-white top-[50%] left-1 rounded-md shadow-md shadow-dark">
                  <span className="font-secondary">
                    Completed: {statistiques.quizCreatedCompleted}
                  </span>
                  <span className="font-secondary">
                    Not Completed: {statistiques.quizCreatedNotCompleted}
                  </span>
                </div>
              </li>

              <li className="bg-dark group h-[100px] shadow-lg shadow-dark-3 rounded-md flex flex-col gap-3 items-center justify-center p-3 relative">
                <span className="font-secondary">Total Likes Given</span>
                <span className="font-secondary font-bold">
                  {statistiques.totalLikesGiven}
                </span>
              </li>

              <li className="bg-dark group h-[100px] shadow-lg shadow-dark-3 rounded-md flex flex-col gap-3 items-center justify-center p-3 relative">
                <span className="font-secondary">Total Likes Received</span>
                <span className="font-secondary font-bold">
                  {statistiques.totalLikesReceivedCount}
                </span>
              </li>

              <li className="bg-dark group h-[100px] shadow-lg shadow-dark-3 rounded-md flex flex-col gap-3 items-center justify-center p-3 relative">
                <span className="font-secondary">Total Comments Given</span>
                <span className="font-secondary font-bold">
                  {statistiques.totalCommentsGiven}
                </span>
              </li>

              <li className="bg-dark group h-[100px] shadow-lg shadow-dark-3 rounded-md flex flex-col gap-3 items-center justify-center p-3 relative">
                <span className="font-secondary">Total Comments Received</span>
                <span className="font-secondary font-bold">
                  {statistiques.totalCommentsReceivedCount}
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-10">
            <h2 className="font-secondary font-bold text-xl my-2">
              Quiz Playeed :
            </h2>
            <ul className="flex flex-wrap gap-4">
              {statistiques.quizWithScores.map((quiz) => (
                <li key={quiz._id} className="flex flex-col gap-4 p-4">
                  <div className="rounded-md overflow-hidden max-w-[250px]">
                    <img
                      src={BASE_URL + "/" + quiz.quizId.backImage}
                      alt="image for quiz"
                      className="object-cover"
                    />
                  </div>

                  <div className="px-1">
                    <p className="font-bold font-secondary text-sm">
                      {quiz.quizId.title}
                    </p>
                    <p className="font-bold font-secondary text-sm">
                      Score: {quiz.score}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
