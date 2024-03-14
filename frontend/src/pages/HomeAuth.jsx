import { socket } from "../socket";
import { LuHeart } from "react-icons/lu";
import { LuHeartOff } from "react-icons/lu";
import { GoComment } from "react-icons/go";
import { HiTrendingUp } from "react-icons/hi";
import { quizPopular, topics } from "../data";
import { useContext, useEffect, useState } from "react";
import { randomIndex } from "../utils/randomIndex";
import {
  getQuizzesByTopic,
  getTheThenPopularQuiz,
  likeOrDislikeQuiz,
} from "../api";
import Loading from "../components/Loading";
import { UserContext } from "../store/user-context";
import Comments from "../components/Comments";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "7",
    topic: "Popular",
    icon: HiTrendingUp,
  },
  ...topics,
];

export default function HomeAuth() {
  const { token } = useContext(UserContext);
  const [categorySelected, setCategorySelected] = useState(categories[0]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState({
    quizId: "",
    isShow: false,
  });

  async function handleData() {
    let dataSelected;
    setIsLoading(true);
    if (categorySelected.topic === "Popular") {
      dataSelected = await getTheThenPopularQuiz();
    } else {
      dataSelected = await getQuizzesByTopic(categorySelected.topic);
    }
    setData(dataSelected.data);
    setIsLoading(false);
  }

  async function handleLikeQuiz(quizId, index) {
    // TODO: show liked or not liked and increment or decrement depends on like or not like sync
    try {
      const resData = await likeOrDislikeQuiz(token, quizId);
      setData((prev) => {
        const quizLiked = [...prev];
        quizLiked[index].totalLikes = resData.quiz.totalLikes;
        return quizLiked;
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleData();
  }, [categorySelected]);

  // useEffect(() => {
  // The problem here is when we ad new quiz, that quiz have categorie
  // So we need to check if the quiz created is the same categorie displayed but the problem here is the catgorie selected go always to pupular
  //   function syncQuizUi(dataSocket) {
  //     console.log(data[0]);
  //     if (dataSocket.quiz.category[0] === categorySelected.topic) {
  //       setData((prev) => [...prev, dataSocket.quiz]);
  //     }
  //   }
  //   socket.on("create-quiz", syncQuizUi);

  //   return () => {
  //     socket.off("create-quiz", syncQuizUi);
  //   };
  // }, []);

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
              <div
                key={quiz._id}
                className="flex flex-col gap-x-3 cursor-pointer group"
              >
                <div className="relative w-[250px] h-[200px] bg-dark-3 overflow-hidden rounded-lg">
                  <img
                    className="object-cover absolute w-full h-full"
                    src={`http://localhost:5000/${quiz.backImage}`}
                    alt={quiz.title}
                  />
                  <div className="bg-dark w-full h-full absolute opacity-0 group-hover:opacity-50 transition-all" />

                  <p className="bg-dark-2 absolute text-sm font-secondary text-light top-2 left-2 border-1 border-light w-fit h-fit rounded-full px-1">
                    {quiz.category}
                  </p>

                  <Link
                    to={`/play-quiz/${quiz._id}`}
                    className="bg-dark flex justify-center items-center uppercase absolute font-secondary px-3 text-light -bottom-[100%] right-0 left-0 h-[20%] group-hover:bottom-0 transition-all border-dark border rounded-b-lg hover:text-dark hover:bg-light"
                  >
                    play
                  </Link>

                  <div className="absolute flex flex-col right-1 top-1 gap-3">
                    <div
                      className="border border-dark bg-light rounded-full w-7 h-7 p-1 flex justify-center items-center hover:scale-110"
                      onClick={() => handleLikeQuiz(quiz._id, index)}
                    >
                      <LuHeart className="font-bold rounded-full cursor-pointer" />
                    </div>
                    <div className="border border-dark bg-light rounded-full w-7 h-7 p-1 flex gap-5 justify-center items-center hover:scale-110">
                      <LuHeartOff className="font-bold rounded-full cursor-pointer" />
                    </div>
                    <div className="border border-dark bg-light rounded-full w-7 h-7 p-1 flex justify-center items-center hover:scale-110">
                      <GoComment
                        className="font-bold rounded-full cursor-pointer"
                        onClick={() =>
                          setShowComments({
                            quizId: quiz._id,
                            isShow: true,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-2 w-full">
                  <div className="flex justify-between items-start w-full gap-3">
                    <h3 className="text-[15px] font-bold font-secondary text-dark">
                      {quiz.title}
                    </h3>
                    <div className="flex items-center justify-center gap-1 text-dark font-bold">
                      <span className="text-dark font-secondary">
                        {quiz.totalLikes}
                      </span>
                      <LuHeart className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-sm font-light text-dark-2">
                    {quiz.description.substring(0, 25)}....
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
