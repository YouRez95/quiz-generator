import { HiTrendingUp } from "react-icons/hi";
import { topics } from "../data";
import { useContext, useEffect, useState } from "react";
import { getQuizzesByTopicAuth, getTheThenPopularQuizAuth } from "../api";
import Loading from "../components/Loading";
import Comments from "../components/Comments";
import HomeAuthCardQuiz from "../components/HomeAuthCardQuiz";
import { UserContext } from "../store/user-context";
import socketConnection from "../socket";
import FooterAuth from "../components/FooterAuth";
import logo from "../assets/logo-single-white.png";
const categories = [
  {
    id: "7",
    topic: "Popular",
    icon: HiTrendingUp,
  },
  ...topics,
];

export default function HomeAuth() {
  console.log("render");
  const { token, user, setSocketState, socketState } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [totalQuiz, setTotalQuiz] = useState(0);
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
      dataSelected = await getTheThenPopularQuizAuth(token, page);
    } else {
      dataSelected = await getQuizzesByTopicAuth(
        categorySelected.topic,
        token,
        page
      );
    }
    setTotalQuiz(dataSelected.numOfQuizzes);
    setData((prevData) => [...prevData, ...dataSelected.data]);
    setIsLoading(false);
  }

  useEffect(() => {
    handleData();
  }, [categorySelected, page]);

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
    <>
      <div className="layer">
        {showComments.isShow && (
          <Comments
            showComments={showComments}
            setShowComments={setShowComments}
          />
        )}

        <div className="mt-20 px-3 pb-40">
          <ul className="flex border-b max-w-[90vw] overflow-y-scroll scrollbar-hide border-dark-3 w-fit font-medium text-dark">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <li
                  key={category.id}
                  className={`font-secondary flex gap-5 items-center border-dark cursor-pointer px-3 ${
                    categorySelected.topic === category.topic &&
                    "border border-dark bg-dark-2 text-light"
                  }`}
                  onClick={() => {
                    setCategorySelected(category);
                    setData([]);
                    setPage(1);
                  }}
                >
                  <Icon />
                  {category.topic}
                </li>
              );
            })}
          </ul>

          {isLoading && data.length === 0 && <Loading />}

          {!isLoading && data.length === 0 && (
            <div className="font-secondary text-center my-10">
              No quizzes created yet, Be the first....
            </div>
          )}

          {data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xmd:grid-cols-3 xl:grid-cols-4 place-items-center sm:place-items-start gap-x-5 gap-y-10 mt-7">
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
        {data.length > 0 && totalQuiz !== data.length && (
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
      </div>
      <FooterAuth />
    </>
  );
}
