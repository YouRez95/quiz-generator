import { SlLike } from "react-icons/sl";
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

        {!isLoading && data.length === 0 && <div>Not Found Any Quiz</div>}

        {!isLoading && data.length > 0 && (
          <div className="mt-20 flex flex-col gap-20">
            {data.map((quiz, index) => (
              <div
                key={quiz._id}
                className="flex gap-5 relative max-w-[1000px]"
              >
                <div className="w-[100px] h-[1px] bg-dark opacity-[.7] absolute -top-5 -left-5" />
                <div className="w-[1px] h-[100px] bg-dark opacity-[.7] absolute -left-5 -top-5" />

                <div className="w-[100px] h-[1px] bg-dark opacity-[.7] absolute -bottom-5 -right-5" />
                <div className="w-[1px] h-[100px] bg-dark opacity-[.7] absolute -right-5 -bottom-5" />

                <img
                  src={`http://localhost:5000/${quiz.backImage}`}
                  alt={quiz.title}
                  className="w-[250px] h-[150px] bg-cover rounded-xl"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div className="grid gap-2">
                    <h2 className="capitalize font-bold text-lg font-secondary">
                      {quiz.title}
                    </h2>
                    <p className="text-dark-2 font-light text-sm">
                      {quiz.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-7">
                      <div className="flex gap-2 items-center">
                        <div className="border border-dark rounded-full w-6 h-6 p-1 flex place-content-center">
                          <SlLike
                            className="font-bold rounded-full cursor-pointer"
                            onClick={() => handleLikeQuiz(quiz._id, index)}
                          />
                        </div>
                        <span>{quiz.totalLikes}</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <div className="border border-dark rounded-full w-6 h-6 p-1 flex place-content-center">
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
                        <span>{quiz.totalComments}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="bg-dark text-light border-1 border-light px-6 py-2 rounded-full">
                        {quiz.category}
                      </p>
                      <p className="bg-light text-dark border-dark border px-10 py-2 rounded-full cursor-pointer">
                        Play
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
