import React, { useState } from "react";
import Header from "../components/Header";
import { avatars } from "../data";
import ButtonLtoR from "../components/ButtonLtoR";
import AvatarRegister from "../components/AvatarRegister";
import InputForm from "../components/InputForm";
import PasswordForm from "../components/PasswordForm";

export default function Register() {
  console.log("Register render");
  const [typePassword, setTypePassword] = useState("password");

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
    avatar: "",
  });

  function handleChangeInput(value, identifier) {
    setInputs((prev) => ({
      ...prev,
      [identifier]: value,
    }));

    console.log(inputs);
  }

  return (
    <div>
      <div className="flex items-start justify-end height-calc bg-light">
        <div className="text-light flex flex-col gap-7 w-[50vw] height-calc bg-dark px-10">
          <h2 className="font-bold  mt-10 text-4xl font-secondary">
            Hi, Welcome to Quizzz
          </h2>
          <form className="flex flex-col gap-4">
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

            <PasswordForm
              id="password"
              typePassword={typePassword}
              setTypePassword={setTypePassword}
              onChange={handleChangeInput}
            />

            <AvatarRegister onChange={handleChangeInput} />

            <div className="mt-10 flex gap-6">
              <button
                type="button"
                className="w-full py-2 flex-1 bg-light text-dark rounded-full text-center"
              >
                Register
              </button>

              <ButtonLtoR to="/login" className="flex-1 text-center">
                Already have an account login
              </ButtonLtoR>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
