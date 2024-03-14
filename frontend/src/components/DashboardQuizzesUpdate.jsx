import React, { useContext, useEffect, useState } from "react";
import InputWithEmojis from "./InputWithEmojis";
import ImageSelectedInForm from "./ImageSelectedInForm";
import TopicSelectedInForm from "./TopicSelectedInForm";
import { useParams } from "react-router-dom";
import { UserContext } from "../store/user-context";

export default function DashboardQuizzesUpdate() {
  const { quizId } = useParams();
  const { token } = useContext(UserContext);
  const [pageUpdate, setPageUpdate] = useState("quiz");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [numQuestion, setNumQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");

  async function getSingleQuiz() {
    const response = await fetch(
      `http://localhost:5000/api/v1/quiz/update/${quizId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const quizData = await response.json();

    // TODO : Handle the response failed here
    setTitle(quizData.data.quiz.title);
    setDescription(quizData.data.quiz.description);
    setFile(quizData.data.quiz.backImage);
    setCategory(quizData.data.quiz.category[0]);
    setNumQuestion(quizData.data.quiz.numQuestion);
    setIsPublic(quizData.data.quiz.publicQuiz);
  }

  function handleChangeRadio(e) {
    console.log(e.target.id);
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
        numQuestion,
      };
      const formData = new FormData();
      for (const key in quizUpdated) {
        formData.append(key, quizUpdated[key]);
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/user/update-quiz/${quizId}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resMessage = await response.json();
      if (!response.ok) {
        throw new Error("");
      }
      setLoading(false);
      setIsSuccess("Your quiz is successfully updated");
    } catch (err) {
      console.log(err);
      setIsSuccess("Your quiz is failed to updated");
    }
  }

  useEffect(() => {
    if (token) {
      getSingleQuiz();
    }
  }, []);

  return (
    <>
      {pageUpdate === "quiz" && (
        <div>
          <div className="flex gap-10">
            <div className="grid gap-5 flex-1">
              <InputWithEmojis
                setTitleInput={setTitle}
                titleInput={title}
                tagHtml="input"
                className="outline-none ml-5 text-lg font-secondary font-bold"
              />

              <InputWithEmojis
                setTitleInput={setDescription}
                titleInput={description}
                tagHtml="textarea"
                className="outline-none ml-5 text-lg font-secondary font-bold w-full"
              />
              <TopicSelectedInForm
                topicSelected={category}
                setTopicSelected={setCategory}
              />
            </div>

            <div>
              <ImageSelectedInForm
                setFile={setFile}
                prevImage={`http://localhost:5000/${file}`}
              />
              <div className="flex-1">
                <label
                  htmlFor="numberQuestion"
                  className="text-md font-bold font-secondary mb-3 block"
                >
                  Enter the number of Questions you want add To your quiz :
                </label>
                <input
                  className="border border-dark w-20 h-10 outline-none text-center"
                  id="numberQuestion"
                  type="number"
                  value={numQuestion}
                  max={10}
                  min={2}
                  onChange={(e) => setNumQuestion(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <p className="text-md font-bold font-secondary">
              You Want your Quiz to be :
            </p>
            <div className="flex gap-20">
              <div className="flex gap-2 items-center">
                <input
                  name="isPublic"
                  id="public"
                  type="radio"
                  className="border w-6 h-6 relative"
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
                  className="border w-6 h-6 relative"
                  onChange={handleChangeRadio}
                  checked={!isPublic}
                />
                <label htmlFor="private">Private</label>
              </div>
            </div>
          </div>

          <div className="mt-7 flex gap-7">
            <button
              className="bg-dark text-light px-3 py-2"
              onClick={handleUpdateQuiz}
            >
              {loading && "Loading ..."}
              {!loading && "Update Quiz Info"}
            </button>
            <button
              className="bg-light text-dark px-3 py-2 border border-dark"
              onClick={() => setPageUpdate("question")}
            >
              Go to Questions
            </button>
          </div>

          {isSuccess && <p className="font-secondary">{isSuccess}</p>}
        </div>
      )}

      {pageUpdate === "question" && <p>update question</p>}
    </>
  );
}
