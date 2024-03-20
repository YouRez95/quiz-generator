import React, { useContext, useState } from "react";
import { likeOrDislikeQuiz } from "../api";
import { LuHeart } from "react-icons/lu";
import { LuHeartOff } from "react-icons/lu";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { UserContext } from "../store/user-context";
import socketConnection from "../socket";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function HomeAuthCardQuiz({ quiz, setShowComments }) {
  const { token, user } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(quiz.isLiked);
  const [totalLikes, setTotalLikes] = useState(quiz.totalLikes);

  async function handleLikeQuiz(quizId) {
    setIsLiked((prev) => !prev);
    if (!isLiked) {
      setTotalLikes((prev) => prev + 1);
      const socket = socketConnection();
      socket.emit("sendLikeQuiz", {
        senderUserId: user._id,
        userAvatar: user.avatar,
        receivedUserId: quiz.userId,
        quizName: quiz.title,
        action: "like",
      });
    } else {
      setTotalLikes((prev) => prev - 1);
    }
    try {
      await likeOrDislikeQuiz(token, quizId);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex flex-col gap-x-3 cursor-pointer group">
      <div className="relative w-[250px] h-[200px] bg-dark-3 overflow-hidden rounded-lg">
        <img
          className="object-cover absolute w-full h-full"
          src={`${BASE_URL}/${quiz.backImage}`}
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
            className={`border border-dark rounded-full w-7 h-7 p-1 flex justify-center items-center hover:scale-110 ${
              isLiked ? "bg-dark-2 text-light" : "bg-light text-dark-2"
            }`}
            onClick={() => handleLikeQuiz(quiz._id)}
          >
            <LuHeart className={`font-bold rounded-full cursor-pointer`} />
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
                  creator: quiz.userId,
                  quizTitle: quiz.title,
                  isShow: true,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-2 w-full justify-between min-h-[100px]">
        <div className="flex justify-between items-start w-full gap-3">
          <h3 className="text-[15px] font-bold font-secondary text-dark">
            {quiz.title}
          </h3>
          <div className="flex items-center justify-center gap-1 text-dark font-bold">
            <span className="text-dark font-secondary">{totalLikes}</span>
            <LuHeart className="w-5 h-5" />
          </div>
        </div>
        <p className="text-sm font-light text-dark-2">
          {quiz.description.substring(0, 25)}....
        </p>
        <p className="text-right w-full font-light text-dark">
          Created By{" "}
          <span className="font-secondary font-bold">
            {quiz.isMine ? "You" : quiz?.userId.username || quiz?.user.username}
          </span>
        </p>
      </div>
    </div>
  );
}
