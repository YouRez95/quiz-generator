import React, { useContext, useEffect, useState } from "react";
import { avatars } from "../data";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import { LuSend } from "react-icons/lu";
import { getCommentsForQuiz, postCreateComments } from "../api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Comments({ showComments, setShowComments }) {
  const { user, loadingUser, token } = useContext(UserContext);
  const [commentsData, setCommentsData] = useState([]);
  const [textInput, setTextInput] = useState("");

  async function getComments() {
    const resData = await getCommentsForQuiz(showComments.quizId, token);
    setCommentsData(resData.data);
  }

  async function createComments() {
    const resData = await postCreateComments(
      showComments.quizId,
      textInput,
      token
    );
    const newComment = {
      _id: Math.random() * 1000,
      userId: user,
      text: textInput,
      createdAt: new Date().toISOString().substring(0, 19),
    };
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
      <div className="px-4 pt-4 fixed top-[50%] left-[50%] transform z-40 translate-y-[-50%] translate-x-[-50%] w-[600px] h-[50vh] bg-light overflow-y-scroll rounded-lg scrollbar-hide">
        <h2 className="mt-10 font-secondary font-bold text-xl text-center">
          Comments
        </h2>

        {loadingUser && <Loading />}

        {!loadingUser && commentsData.length === 0 && (
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
                  className="flex gap-3 border border-dark-3 items-center p-3 relative"
                >
                  <div className="w-[50px] h-[50px]">
                    <img
                      src={`${BASE_URL}/avatars/${comment.userId.avatar}.png`}
                      alt={comment.userId.avatar}
                    />
                  </div>

                  <div>
                    <h3 className="font-secondary text-md font-medium">
                      {comment.userId.username}
                    </h3>
                    <p className="text-sm">{comment.text}</p>
                    <span className="absolute right-1 top-1 text-sm font-secondary text-dark-3">
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
            className="flex-1 py-5 pl-5 outline-none bg-dark text-light rounded-lg"
          />
          <LuSend
            className="absolute right-9 text-light bg-dark-2 rounded-full w-9 h-9 p-2 cursor-pointer"
            onClick={createComments}
          />
        </div>
      </div>
    </>
  );
}
