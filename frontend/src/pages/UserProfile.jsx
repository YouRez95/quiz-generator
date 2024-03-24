import React, { useContext, useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { CgMenuGridO } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDraftLine } from "react-icons/ri";
import { NavLink, Outlet, Navigate, Link } from "react-router-dom";
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
      {/* Aside bar for large screen */}
      <div
        className={`fixed bg-dark top-0 bottom-0 text-light hidden 2xl:block w-[220px] px-5 mt-10`}
      >
        <ul>
          <li className=" cursor-pointer mt-[80px]">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                isActive ? "block bg-light text-dark rounded-full" : ""
              }
            >
              <div
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-start pl-4`}
              >
                <CgMenuGridO className="size-7" />
                <p className="hidden 2xl:block font-secondary font-bold text-base transition-all">
                  Dashboard
                </p>
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
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-start pl-4 `}
              >
                <MdOutlineQuiz className="size-7" />
                <p className="font-secondary font-bold text-base transition-all">
                  My Quizzes
                </p>
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
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-start pl-4`}
              >
                <RiDraftLine className="size-7" />
                <p className="font-secondary font-bold text-base transition-all">
                  My Draft
                </p>
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
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-start pl-4`}
              >
                <IoMdNotificationsOutline className="size-7" />
                <p className="font-secondary font-bold text-base transition-all">
                  Notification
                </p>
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
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-start pl-4`}
              >
                <IoSettingsOutline className="size-7" />
                <p className="font-secondary font-bold text-base transition-all">
                  Setting
                </p>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Aside bar for medium screen */}
      <div
        className={`fixed bg-dark mt-10 top-0 bottom-0 text-light hidden w-[75px] px-3 md:block 2xl:hidden`}
      >
        <ul>
          <li className=" cursor-pointer mt-[80px]">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                isActive ? "block bg-light text-dark rounded-full" : ""
              }
            >
              <div
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-center`}
              >
                <CgMenuGridO className="w-[30px] h-[30px] " />
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
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-center `}
              >
                <MdOutlineQuiz className="w-[30px] h-[30px] " />
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
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-center `}
              >
                <RiDraftLine className="w-[30px] h-[30px] " />
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
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-center`}
              >
                <IoMdNotificationsOutline className="w-[30px] h-[30px] " />
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
                className={`w-full h-[50px] flex gap-3 items-center mt-9 justify-center`}
              >
                <IoSettingsOutline className="w-[30px] h-[30px] " />
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Aside bar for small screen */}
      <div className="fixed z-50 w-full h-[70px] bg-dark bottom-0 rounded-t-lg block md:hidden">
        <ul className="flex justify-between items-center h-full px-3 xsm:px-4 md:px-6">
          <li className="text-light">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                isActive ? "block bg-light text-dark rounded-full p-2" : "p-2"
              }
            >
              <CgMenuGridO className="size-5 xsm:size-7 md:size-10" />
            </NavLink>
          </li>

          <li className="text-light">
            <NavLink
              to="quizzes"
              className={({ isActive }) =>
                isActive
                  ? "block bg-light text-dark rounded-full p-2"
                  : "rounded-full p-2"
              }
            >
              <MdOutlineQuiz className="size-5 xsm:size-7 md:size-10" />
            </NavLink>
          </li>

          <li className="text-light">
            <NavLink
              to="draft"
              className={({ isActive }) =>
                isActive
                  ? "block bg-light text-dark rounded-full p-2"
                  : "rounded-full p-2"
              }
            >
              <RiDraftLine className="size-5 xsm:size-7 md:size-10" />
            </NavLink>
          </li>

          <li className="text-light">
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                isActive
                  ? "block bg-light text-dark rounded-full p-2"
                  : "rounded-full p-2"
              }
            >
              <IoMdNotificationsOutline className="size-5 xsm:size-7 md:size-10" />
            </NavLink>
          </li>

          <li className="text-light">
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? "block bg-light text-dark rounded-full p-2"
                  : "rounded-full p-2"
              }
            >
              <IoSettingsOutline className="size-5 xsm:size-7 md:size-10" />
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="m-auto px-3 layer md:pl-16 xmd:pl-20 2xl:pl-48">
        <Outlet />
      </div>
    </div>
  );
}
