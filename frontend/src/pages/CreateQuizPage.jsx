import React, { useContext, useRef, useState } from "react";
import Header from "../components/Header";
import InputWithEmojis from "../components/InputWithEmojis";
import TopicSelectedInForm from "../components/TopicSelectedInForm";
import ImageSelectedInForm from "../components/ImageSelectedInForm";
import { UserContext } from "../store/user-context";
import { Navigate, useNavigate } from "react-router-dom";
import { createQuiz } from "../api";
import { MdErrorOutline } from "react-icons/md";

export default function CreateQuizPage() {
  const navigate = useNavigate();
  const { token, user } = useContext(UserContext);
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [file, setFile] = useState(null);
  const [topicSelected, setTopicSelected] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numQuestion, setNumQuestion] = useState(0);

  function handleChangeRadio(e) {
    if (e.target.id === "private") {
      setIsPublic(false);
    } else {
      setIsPublic(true);
    }
  }

  async function handleCreateQuiz(e) {
    e.preventDefault();

    try {
      if (
        !titleInput ||
        !descInput ||
        !file ||
        !topicSelected ||
        !numQuestion
      ) {
        throw new Error("All Input Required");
      }
      setError(null);
      setLoading(true);
      const newQuiz = {
        title: titleInput,
        description: descInput,
        backImage: file,
        category: topicSelected,
        publicQuiz: isPublic,
        numQuestion,
      };
      const resData = await createQuiz(newQuiz, token);
      navigate(`/create-questions/${resData.quizId}`);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header inCreateQuiz={true} />

      <div className="layer text-dark">
        <div className="mt-20 grid gap-10">
          <div>
            <h1 className="font-extrabold text-3xl font-secondary">
              Create Your Quiz....
            </h1>
          </div>
          <form onSubmit={handleCreateQuiz}>
            <div className="flex items-start">
              <div className="grid gap-20">
                <InputWithEmojis
                  titleInput={titleInput}
                  setTitleInput={setTitleInput}
                  tagHtml="input"
                  className="outline-none w-[700px] h-[60px] text-xl font-bold font-secondary overflow-hidden pl-7"
                  placeholder="Title to your quiz"
                  maxLength={55}
                />
                <InputWithEmojis
                  titleInput={descInput}
                  setTitleInput={setDescInput}
                  tagHtml="textarea"
                  className=" outline-none w-[700px] h-[100px] text-xl font-bold font-secondary overflow-hidden pl-7"
                  placeholder="Description"
                  maxLength={300}
                />
              </div>

              <ImageSelectedInForm setFile={setFile} />
            </div>
            <div className="flex">
              <div className="grid gap-10 flex-1">
                <TopicSelectedInForm
                  topicSelected={topicSelected}
                  setTopicSelected={setTopicSelected}
                />

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
                      />
                      <label htmlFor="private">Private</label>
                    </div>
                  </div>
                </div>
              </div>
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
                  max={10}
                  min={2}
                  onChange={(e) => setNumQuestion(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-20 text-right">
              <button
                disabled={loading}
                className="bg-dark px-20 py-3 border border-dark text-light rounded-full font-secondary font-bold hover:text-dark hover:bg-light"
              >
                Next
              </button>
            </div>

            {error && (
              <div className="border border-dark bg-dark text-light w-fit p-5 flex gap-2 items-center mb-6">
                <MdErrorOutline className="text-2xl" />
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
