import React, { useContext } from "react";
import Header from "../components/Header";
import MainHome from "../components/MainHome";
import QuizPopular from "../components/QuizPopular";
import QuizByTopic from "../components/QuizByTopic";
import Topics from "../components/Topics";
import Footer from "../components/Footer";
import { UserContext } from "../store/user-context";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && (
        <div className="bg-dark">
          <div className="border-b-2 border-light min-h-[50vh]">
            <MainHome />
          </div>
        </div>
      )}
      <div className="bg-light">
        <div className="layer pt-20 flex flex-col gap-10">
          <QuizPopular />

          <div className="flex gap-20 my-20">
            <div className="flex-[2]">
              <QuizByTopic />
            </div>
            <aside className="flex-1">
              <Topics />
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
