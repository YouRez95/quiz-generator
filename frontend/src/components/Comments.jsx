import React, { useContext, useEffect, useState } from "react";
import { avatars } from "../data";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import { LuSend } from "react-icons/lu";
import { getCommentsForQuiz, postCreateComments } from "../api";

const BASE_URL = import.meta.env.VITE_BASE_URL;
import { IoCloseOutline } from "react-icons/io5";

export default function Comments({ showComments, setShowComments }) {
  const { user, loadingUser, token, setNotifications, socketState } =
    useContext(UserContext);
  const [commentsData, setCommentsData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  async function getComments() {
    setLoadingComments(true);
    const resData = await getCommentsForQuiz(showComments.quizId, token);
    setCommentsData(resData.data);
    setLoadingComments(false);
  }

  async function createComments() {
    await postCreateComments(showComments.quizId, textInput, token);
    const newComment = {
      _id: Math.random() * 1000,
      userId: user,
      text: textInput,
      createdAt: new Date().toISOString().substring(0, 19),
    };

    socketState.emit("sendCommentQuiz", {
      senderUserId: user._id,
      userAvatar: user.avatar,
      receivedUserId: showComments.creator,
      quizName: showComments.quizTitle,
      action: "Comment",
      textInput,
    });
    setCommentsData((prev) => [newComment, ...prev]);
    setTextInput("");
  }

  useEffect(() => {
    if (token) {
      getComments();
    }
  }, []);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "visible");
  }, []);

  return (
    <>
      <div
        className="fixed bg-dark opacity-60 z-40 top-0 left-0 w-[100vw] h-[100vh]"
        onClick={() => setShowComments({})}
      />
      <div className="px-4 pt-4 fixed top-[50%] left-[50%] transform z-40 translate-y-[-50%] translate-x-[-50%] w-full max-w-[600px] max-h-[80vh] bg-light overflow-y-scroll rounded-lg scrollbar-hide">
        <h2 className="mt-10 font-secondary font-bold text-xl text-center">
          Comments
        </h2>

        <div
          className="absolute top-3 right-3 size-7 flex items-center  justify-center cursor-pointer"
          onClick={() => setShowComments({})}
        >
          <IoCloseOutline className="border size-full" />
        </div>
        {(loadingUser || loadingComments) && <Loading />}

        {!loadingComments && commentsData.length === 0 && (
          <div className="font-secondary font-light text-center my-7">
            No Comments Yet, be the first One
          </div>
        )}

        {!loadingUser && commentsData.length > 0 && (
          <div>
            <ul className="flex flex-col gap-2 mb-4">
              {commentsData.map((comment) => (
                <li
                  key={comment._id}
                  className="flex gap-3 border border-dark-3 items-start p-2 relative pb-5"
                >
                  <div className="w-[50px] h-[50px]">
                    <img
                      src={`${BASE_URL}/avatars/${comment.userId.avatar}.png`}
                      alt={comment.userId.avatar}
                    />
                  </div>

                  <div className="bg-white w-full p-3 rounded-lg">
                    <h3 className="font-secondary text-base font-bold">
                      {comment.userId.username}
                    </h3>
                    <p className="text-sm font-light">{comment.text}</p>
                    <span className="absolute right-2 bottom-0 text-[12px] xmd:text-base xmd:right-5 xmd:top-3 text-sm font-secondary text-dark-3">
                      commented at {comment.createdAt.substring(0, 19)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3 border bg-light w-full right-0 left-0 border-dark-3 items-center p-3 sticky bottom-0 overflow-y-hidden">
          <div className="w-[50px] h-[50px]">
            <img src={`${BASE_URL}/avatars/${user.avatar}.png`} alt="" />
          </div>
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            type="text"
            placeholder="Add your comment here ..."
            className="flex-1 py-2 sm:py-5 pl-5 outline-none bg-dark text-light rounded-lg"
          />
          <LuSend
            className="absolute right-5 text-light bg-dark-2 rounded-full size-7 sm:size-9 p-2 cursor-pointer"
            onClick={createComments}
          />
        </div>
      </div>
    </>
  );
}
