import { useState } from "react";
import MainHome from "../components/MainHome";
import QuizPopular from "../components/QuizPopular";
import QuizByTopic from "../components/QuizByTopic";
import Topics from "../components/Topics";
import Footer from "../components/Footer";

import { topics } from "../data";
import { randomIndex } from "../utils/randomIndex";

export default function HomeNotAuth() {
  const [topic, setTopic] = useState({
    topic: topics[randomIndex(topics.length)].topic,
    icon: topics[randomIndex(topics.length)].icon,
  });

  return (
    <>
      <div className="bg-dark">
        <div className="border-b-2 border-light min-h-[50vh] relative">
          <MainHome />
          <div className="absolute bg-img-dark bg-cover top-[0px] right-[20vw] w-[600px] h-full" />
        </div>
      </div>

      <div className="bg-light">
        <div className="layer pt-20 flex flex-col gap-10">
          <QuizPopular />

          <div className="flex gap-20 my-20">
            <div className="flex-[2]">
              <QuizByTopic topic={topic} />
            </div>
            <aside className="flex-1">
              <Topics topicSelected={topic} onChangeTopic={setTopic} />
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
