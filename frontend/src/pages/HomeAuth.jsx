import { HiTrendingUp } from "react-icons/hi";
import { topics } from "../data";
import { useContext, useEffect, useState } from "react";
import { getQuizzesByTopicAuth, getTheThenPopularQuizAuth } from "../api";
import Loading from "../components/Loading";
import Comments from "../components/Comments";
import HomeAuthCardQuiz from "../components/HomeAuthCardQuiz";
import { UserContext } from "../store/user-context";
import socketConnection from "../socket";

const categories = [
  {
    id: "7",
    topic: "Popular",
    icon: HiTrendingUp,
  },
  ...topics,
];

export default function HomeAuth() {
  const { token, user, setSocketState, socketState } = useContext(UserContext);
  const [categorySelected, setCategorySelected] = useState(categories[0]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState({
    quizId: "",
    isShow: false,
    quizTitle: "",
    creator: "",
  });

  async function handleData() {
    let dataSelected;
    setIsLoading(true);
    if (categorySelected.topic === "Popular") {
      dataSelected = await getTheThenPopularQuizAuth(token);
    } else {
      dataSelected = await getQuizzesByTopicAuth(categorySelected.topic, token);
    }
    setData(dataSelected.data);
    setIsLoading(false);
  }

  useEffect(() => {
    handleData();
  }, [categorySelected]);

  useEffect(() => {
    const socket = socketConnection();
    setSocketState(socket);

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    socketState?.emit("newUser", { userId: user._id, username: user.username });
  }, [user, socketState]);

  return (
    <div className="layer">
      {showComments.isShow && (
        <Comments
          showComments={showComments}
          setShowComments={setShowComments}
        />
      )}
      <div className="mt-20">
        <ul className="flex border-b border-dark-3 w-fit font-medium text-dark">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`font-secondary border-dark cursor-pointer px-5 ${
                categorySelected.topic === category.topic && "border-b-2 border"
              }`}
              onClick={() => setCategorySelected(category)}
            >
              {category.topic}
            </li>
          ))}
        </ul>

        {isLoading && <Loading />}

        {!isLoading && data.length === 0 && (
          <div className="font-secondary text-center my-10">
            No quizzes created yet, Be the first....
          </div>
        )}

        {!isLoading && data.length > 0 && (
          <div className="grid grid-cols-5 gap-x-5 gap-y-10 mt-7">
            {data.map((quiz, index) => (
              <HomeAuthCardQuiz
                key={quiz._id}
                quiz={quiz}
                setData={setData}
                setShowComments={setShowComments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
