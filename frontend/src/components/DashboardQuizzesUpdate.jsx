import React, { useContext, useEffect, useState } from "react";
import InputWithEmojis from "./InputWithEmojis";
import ImageSelectedInForm from "./ImageSelectedInForm";
import TopicSelectedInForm from "./TopicSelectedInForm";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../store/user-context";
import { getSingleQuizToDashboard, putHandleUpdateQuiz } from "../api";
import DashboardQuizzesUpdateQuestions from "./DashboardQuizzesUpdateQuestions";
import Loading from "./Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function DashboardQuizzesUpdate() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { token } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  // const [numQuestion, setNumQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");

  async function getSingleQuiz() {
    setLoadingData(true);
    const quizData = await getSingleQuizToDashboard(quizId, token);

    // TODO : Handle the response failed here
    setTitle(quizData.data.quiz.title);
    setDescription(quizData.data.quiz.description);
    setFile(quizData.data.quiz.backImage);
    setCategory(quizData.data.quiz.category[0]);
    // setNumQuestion(quizData.data.quiz.numQuestion);
    setIsPublic(quizData.data.quiz.publicQuiz);
    setLoadingData(false);
  }

  function handleChangeRadio(e) {
    if (e.target.id === "private") {
      setIsPublic(false);
    } else {
      setIsPublic(true);
    }
  }

  async function handleUpdateQuiz() {
    setIsSuccess("");
    try {
      setLoading(true);
      const quizUpdated = {
        title,
        description,
        backImage: file,
        category,
        publicQuiz: isPublic,
      };

      await putHandleUpdateQuiz(quizUpdated, quizId, token);
      setLoading(false);
      setIsSuccess("Your quiz is successfully updated");
    } catch (err) {
      setIsSuccess("Your quiz is failed to updated");
    }
  }

  useEffect(() => {
    if (token) {
      getSingleQuiz();
    }
  }, []);

  if (loadingData) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-32">
        <div className="flex flex-col 3xl:flex-row gap-10">
          <div className="grid gap-5 flex-1">
            <InputWithEmojis
              setTitleInput={setTitle}
              titleInput={title}
              tagHtml="input"
              className="outline-none border-b border-dark-3 rounded-lg w-full max-w-[500px] max-h-[60px] min-h-[40px] h-full text-base font-bold font-secondary overflow-hidden pl-2"
            />

            <InputWithEmojis
              setTitleInput={setDescription}
              titleInput={description}
              tagHtml="textarea"
              className=" outline-none border-y border-dark-3 rounded-lg w-full max-w-[500px] min-h-[100px] text-base font-bold font-secondary overflow-hidden pl-2"
            />
            <TopicSelectedInForm
              topicSelected={category}
              setTopicSelected={setCategory}
            />
          </div>

          <div>
            <ImageSelectedInForm
              setFile={setFile}
              prevImage={`${BASE_URL}/${file}`}
            />
          </div>
        </div>

        <div className="grid gap-3">
          <p className="text-sm  md:text-base font-bold font-secondary">
            You Want your Quiz to be :
          </p>
          <div className="flex gap-20 text-sm md:text-base">
            <div className="flex gap-2 items-center">
              <input
                name="isPublic"
                id="public"
                type="radio"
                className="border size-5 md:size-6 relative"
                onChange={handleChangeRadio}
                checked={isPublic}
              />
              <label htmlFor="public">Public</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                name="isPublic"
                id="private"
                type="radio"
                className="border size-5 md:size-6 relative"
                onChange={handleChangeRadio}
              />
              <label htmlFor="private">Private</label>
            </div>
          </div>
        </div>

        <div className="mt-7 flex gap-7">
          <button
            className="bg-dark text-light px-2 py-1 text-sm"
            onClick={handleUpdateQuiz}
          >
            {loading && "Loading ..."}
            {!loading && "Update Quiz Info"}
          </button>
          <button
            className="bg-light text-dark border border-dark px-2 py-1 text-sm"
            onClick={() => navigate("..")}
          >
            Back
          </button>
        </div>

        {isSuccess && <p className="font-secondary">{isSuccess}</p>}
      </div>
    </>
  );
}
