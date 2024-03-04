import React, { useState } from "react";
import InputForm from "../components/InputForm";
import PasswordForm from "../components/PasswordForm";
import ButtonLtoR from "../components/ButtonLtoR";
import { isValidLoginForm } from "../utils/validForm";
import { loginUser } from "../api";

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  function handleChangeInput(value, identifier) {
    setInputs((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const isValidInputs = isValidLoginForm(inputs);
      if (!isValidInputs.success) {
        setErrorMsg(isValidInputs.message);
        return;
      }
      setLoading(true);
      const resData = await loginUser(inputs);
      setErrorMsg(null);
      localStorage.setItem("user", JSON.stringify(resData.data));
      window.location.href = "/";
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="flex items-start justify-start height-calc bg-light">
        <div className="text-light flex flex-col items-center pt-20 gap-7 w-[50vw] height-calc bg-dark px-10">
          <h2 className="font-bold  mt-10 text-4xl font-secondary">
            Hi, Welcome Back
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
            <InputForm
              id="email"
              type="email"
              text="Email"
              placeholder="quizzz@gmail.com"
              onChange={handleChangeInput}
            />

            <PasswordForm id="password" onChange={handleChangeInput} />

            <div className="mt-10 flex flex-col gap-6">
              <button
                type="submit"
                className="w-full py-2 flex-1 bg-light text-dark rounded-full text-center"
              >
                {loading ? "Loading..." : "Login"}
              </button>

              <ButtonLtoR to="/login" className="flex-1 text-center">
                D'ont have an account Register
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

        {/* <div className="bg-img-light bg-cover bg-position w-[50%] h-[90vh]" /> */}
      </div>
    </div>
  );
}
