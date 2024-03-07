import React, { useContext, useState } from "react";
import ButtonLtoR from "../components/ButtonLtoR";
import AvatarRegister from "../components/AvatarRegister";
import InputForm from "../components/InputForm";
import PasswordForm from "../components/PasswordForm";
import Modal from "../components/Modal";
import { isValidRegisterForm } from "../utils/validForm";
import { createUser } from "../api";
import { Navigate } from "react-router-dom";
import { UserContext } from "../store/user-context";

export default function Register() {
  const { user, loadingUser } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
    avatar: "avatar1",
  });

  function handleChangeInput(value, identifier) {
    setInputs((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  }

  async function handleSubmitForm(event) {
    event.preventDefault();

    const isValidInputs = isValidRegisterForm(inputs);
    if (!isValidInputs.success) {
      setErrorMsg(isValidInputs.message);
      return;
    }

    try {
      setLoading(true);
      await createUser(inputs);
      setSuccessRegister(true);
      setErrorMsg(null);
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setErrorMsg("Something went wrong. Please try again later.");
      } else {
        setErrorMsg(err.message);
      }
    }
    setLoading(false);
  }

  if (!loadingUser && user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative">
      {successRegister && <Modal fullname={inputs.fullname} />}
      <div className="flex items-start justify-end height-calc bg-light">
        <div className="text-light flex flex-col gap-7 w-[50vw] height-calc bg-dark px-10">
          <h2 className="font-bold  mt-10 text-4xl font-secondary">
            Hi, Welcome to Quizzz
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
            <InputForm
              id="email"
              type="email"
              text="Email"
              placeholder="quizzz@gmail.com"
              onChange={handleChangeInput}
            />

            <InputForm
              id="username"
              type="text"
              text="Username"
              placeholder="CR7"
              onChange={handleChangeInput}
            />

            <InputForm
              id="fullname"
              type="text"
              text="Fullname"
              placeholder="Cristiano Ronaldo"
              onChange={handleChangeInput}
            />

            <PasswordForm id="password" onChange={handleChangeInput} />

            <AvatarRegister onChange={handleChangeInput} />

            <div className="mt-10 flex gap-6">
              <button
                disabled={loading}
                type="submit"
                className="w-full py-2 flex-1 bg-light text-dark rounded-full text-center"
              >
                {loading ? "Loading" : "Register"}
              </button>

              <ButtonLtoR to="/login" className="flex-1 text-center">
                Already have an account login
              </ButtonLtoR>
            </div>
          </form>

          {errorMsg && (
            <div className="w-[50%] m-auto relative">
              <div className="bg-light absolute w-[40px] h-[40px] flex items-center justify-center rounded-full text-dark font-extrabold -top-2 -left-2">
                !
              </div>
              <p className="border w-full text-center px-9 py-5">{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
