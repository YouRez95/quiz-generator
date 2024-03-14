import React, { useContext, useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDraftLine } from "react-icons/ri";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../store/user-context";
import Loading from "../components/Loading";

export default function UserProfile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loadingUser, user } = useContext(UserContext);

  if (loadingUser) return <Loading />;

  if (!loadingUser && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full custom-height relative">
      <div
        className={`fixed bg-dark top-0 bottom-0 text-light ${
          menuOpen ? "w-[300px] px-9" : "w-[75px] px-3"
        }`}
      >
        <ul>
          <li
            className=" cursor-pointer mt-[80px]"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                isActive ? "block bg-light text-dark rounded-full" : ""
              }
            >
              <div
                className={`w-full h-[50px] flex gap-3 items-center mt-9 ${
                  menuOpen ? "justify-start pl-4" : "justify-center"
                }`}
              >
                <CgMenuGridO className="w-[30px] h-[30px] " />
                {menuOpen && (
                  <p className="font-secondary font-bold text-xl transition-all">
                    Dashboard
                  </p>
                )}
              </div>
            </NavLink>
          </li>

          <li className=" cursor-pointer mt-20">
            <NavLink
              to="quizzes"
              className={({ isActive }) =>
                isActive ? "block bg-light text-dark rounded-full" : ""
              }
            >
              <div
                className={`w-full h-[50px] flex gap-3 items-center mt-9 ${
                  menuOpen ? "justify-start pl-4" : "justify-center"
                }`}
              >
                <MdOutlineQuiz className="w-[30px] h-[30px] " />
                {menuOpen && (
                  <p className="font-secondary font-bold text-xl transition-all">
                    My Quizzes
                  </p>
                )}
              </div>
            </NavLink>
          </li>

          <li className=" cursor-pointer">
            <NavLink
              to="draft"
              className={({ isActive }) =>
                isActive ? "block bg-light text-dark rounded-full" : ""
              }
            >
              <div
                className={`w-full h-[50px] flex gap-3 items-center mt-9 ${
                  menuOpen ? "justify-start pl-4" : "justify-center"
                }`}
              >
                <RiDraftLine className="w-[30px] h-[30px] " />
                {menuOpen && (
                  <p className="font-secondary font-bold text-xl transition-all">
                    My Draft
                  </p>
                )}
              </div>
            </NavLink>
          </li>

          <li className=" cursor-pointer">
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                isActive ? "block bg-light text-dark rounded-full" : ""
              }
            >
              <div
                className={`w-full h-[50px] flex gap-3 items-center mt-9 ${
                  menuOpen ? "justify-start pl-4" : "justify-center"
                }`}
              >
                <IoMdNotificationsOutline className="w-[30px] h-[30px] " />
                {menuOpen && (
                  <p className="font-secondary font-bold text-xl transition-all">
                    Notifications
                  </p>
                )}
              </div>
            </NavLink>
          </li>

          <li className=" cursor-pointer">
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive ? "block bg-light text-dark rounded-full" : ""
              }
            >
              <div
                className={`w-full h-[50px] flex gap-3 items-center mt-9 ${
                  menuOpen ? "justify-start pl-4" : "justify-center"
                }`}
              >
                <IoSettingsOutline className="w-[30px] h-[30px] " />
                {menuOpen && (
                  <p className="font-secondary font-bold text-xl transition-all">
                    Setting
                  </p>
                )}
              </div>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="max-w-[1000px] m-auto">
        <Outlet />
      </div>
    </div>
  );
}
