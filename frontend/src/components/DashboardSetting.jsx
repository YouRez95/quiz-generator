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
      <h1 className="text-dark font-secondary text-3xl font-bold">Settings</h1>

      <form
        onSubmit={handleSubmitUpdateUserData}
        className="flex flex-col gap-10 w-[800px] max-w-[800px] m-auto items-start"
      >
        <div className=" flex items-end gap-4">
          <label htmlFor="email" className="font-secondary text-xl ">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            readOnly
            className="border-b-2 px-2 py-1 outline-none border-dark min-w-[300px] text-dark-2"
          />
        </div>

        <div className=" flex items-end gap-4">
          <label htmlFor="fullname" className="font-secondary text-xl">
            Fullname
          </label>
          <input
            onChange={handleChangeInputs}
            type="text"
            id="fullname"
            placeholder={user.fullname}
            className="border-b-2 px-2 py-1 outline-none border-dark min-w-[300px] text-dark-2"
          />
        </div>

        <div className=" flex items-end gap-4">
          <label htmlFor="username" className="font-secondary text-xl">
            username
          </label>
          <input
            onChange={handleChangeInputs}
            type="text"
            id="username"
            placeholder={user.username}
            className="border-b-2 px-2 py-1 outline-none border-dark min-w-[300px] text-dark-2"
          />
        </div>
        <div className=" flex flex-col items-start gap-1">
          <p className="font-secondary text-xl">Change Avatar</p>
          <AvatarRegister onChange={handleAvatar} />
        </div>

        <div className="mt-10 flex justify-end w-full">
          <button className="bg-dark px-4 py-2 rounded-full text-light">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
