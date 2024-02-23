import React from "react";
import Header from "../components/Header";
import MainHome from "../components/MainHome";
import QuizPopular from "../components/QuizPopular";
import QuizByTopic from "../components/QuizByTopic";
import Topics from "../components/Topics";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="back-img">
        <div className="border-b-2 border-black min-h-[50vh]">
          <MainHome />
        </div>
      </div>
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

      <Footer />
    </>
  );
}
