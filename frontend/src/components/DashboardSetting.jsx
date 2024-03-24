import React, { useContext, useState } from "react";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";
import AvatarRegister from "./AvatarRegister";
import { useNavigate } from "react-router-dom";
import { putUpdateUserData } from "../api";

export default function DashboardSetting() {
  const { user, token, handleUpdateUserInfo } = useContext(UserContext);
  const [updateUserData, setUpdateUserData] = useState({});
  const navigate = useNavigate();

  function handleChangeInputs(e) {
    setUpdateUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleAvatar(value, name) {
    setUpdateUserData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitUpdateUserData(e) {
    e.preventDefault();
    const resData = await putUpdateUserData(updateUserData, token);
    handleUpdateUserInfo(resData.user);
    navigate("/profile");
  }

  if (!user || !token) return <Loading />;

  return (
    <div className="pt-20 grid gap-10">
      <h1 className="text-dark font-secondary text-xl font-bold">Settings</h1>

      <form
        onSubmit={handleSubmitUpdateUserData}
        className="flex flex-col gap-10 md:w-full max-w-[800px] m-auto items-start"
      >
        <div className="flex flex-col items-start w-full">
          <label htmlFor="email" className="font-secondary text-base ">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            readOnly
            className="border-b-2 px-2 py-1 outline-none border-dark w-full text-dark-2"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="fullname" className="font-secondary text-base">
            Fullname
          </label>
          <input
            onChange={handleChangeInputs}
            type="text"
            id="fullname"
            defaultValue={user.fullname}
            className="border-b-2 px-2 py-1 outline-none border-dark text-dark-2 w-full"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="username" className="font-secondary text-base">
            username
          </label>
          <input
            onChange={handleChangeInputs}
            type="text"
            id="username"
            defaultValue={user.username}
            className="border-b-2 px-2 py-1 outline-none border-dark text-dark-2 w-full"
          />
        </div>
        <div className=" flex flex-col items-start gap-1">
          <p className="font-secondary text-xl">Change Avatar</p>
          <AvatarRegister onChange={handleAvatar} prevAvatar={user.avatar} />
        </div>

        <div className="mt-10 mb-32 flex justify-end w-full">
          <button className="bg-dark px-4 py-2 rounded-full text-light">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
