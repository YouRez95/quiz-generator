import { useEffect, useState } from "react";
import MainHome from "../components/MainHome";
import QuizPopular from "../components/QuizPopular";
import QuizByTopic from "../components/QuizByTopic";
import Topics from "../components/Topics";
import Footer from "../components/Footer";
import backHomeDark from "../assets/back-home-dark.png";
import { topics } from "../data";
import { randomIndex } from "../utils/randomIndex";
import { getQuizzesByTopic } from "../api";

export default function HomeNotAuth() {
  const [topic, setTopic] = useState({
    topic: topics[randomIndex(topics.length)].topic,
    icon: topics[randomIndex(topics.length)].icon,
  });
  const [page, setPage] = useState(1);
  const [dataQuizByTopic, setDataQuizByTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [totalDocs, setTotalDocs] = useState(0);

  async function handleQuizByTopic() {
    setLoading(true);
    try {
      const resData = await getQuizzesByTopic(topic.topic, page);
      setTotalDocs(resData.numOfQuizzes);
      setDataQuizByTopic((prev) => [...prev, ...resData.data]);
      setLoading(false);
    } catch (err) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    handleQuizByTopic();
  }, [topic, page]);

  return (
    <>
      <div className="bg-dark border-b-2 border-light overflow-hidden">
        <div className=" min-h-[45vh] relative overflow-hidden layer">
          <MainHome />
          <div className="absolute -top-[20%] right-10 w-[600px] h-[600px] hidden xmd:block">
            <img src={backHomeDark} className="object-cover" alt="" />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="layer pt-20 flex flex-col gap-10 px-3">
          <QuizPopular />

          <div className="flex gap-20 flex-col xl:flex-row my-20">
            <div className="flex-[2] order-2 xl:order-1">
              <QuizByTopic
                topic={topic}
                setPage={setPage}
                dataQuizByTopic={dataQuizByTopic}
                loading={loading}
                errorMsg={errorMsg}
                totalDocs={totalDocs}
              />
            </div>
            <aside className="flex-1 xl:order-2">
              <Topics
                topicSelected={topic}
                onChangeTopic={setTopic}
                setPage={setPage}
                setDataQuizByTopic={setDataQuizByTopic}
              />
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
