import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../store/user-context";
import NavbarNotAuth from "./NavbarNotAuth";
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "../assets/logo-single.png";
import { notifications as apiNotifications } from "../api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Header({ inCreateQuiz }) {
  const {
    user,
    handleLogout,
    socketState,
    setNotifications,
    notifications,
    token,
  } = useContext(UserContext);
  const [dropOpen, setDropOpen] = useState(false);
  const menuRef = useRef();
  const linksRef = useRef();

  const handleOutsideClick = (event) => {
    if (linksRef.current && linksRef.current.contains(event.target)) {
      setTimeout(() => {
        setDropOpen(false);
      }, 1000);
    }

    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      linksRef.current &&
      !linksRef.current.contains(event.target)
    ) {
      setDropOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    socketState?.on("receiveLikePost", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    socketState?.on("receiveCommentsPost", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socketState]);

  async function getNotifications() {
    const resData = await apiNotifications(token);

    for (let i = 0; i < resData.notifications.length; i++) {
      const newNotification = {
        _id: resData.notifications[i]._id,
        userAvatar: resData.notifications[i].senderId.avatar,
        action: resData.notifications[i].notificationType,
        username: resData.notifications[i].senderId.username,
        quizName: resData.notifications[i].quizName,
        text: resData.notifications[i]?.text,
      };
      setNotifications((prev) => [...prev, newNotification]);
    }
  }

  useEffect(() => {
    if (token) {
      getNotifications();
    }
  }, [token]);

  return (
    <>
      {!user && <NavbarNotAuth />}

      {user && (
        <header className="border-b-2 border-dark bg-light sticky top-0 z-20">
          <div className="flex justify-between h-[50px] xsm:h-[70px] items-center layer relative px-3">
            <Link to="/" className="text-lg">
              <img src={logo} className="w-12 sm:w-[55px]" alt="" />
            </Link>

            <div className="flex gap-6">
              {!inCreateQuiz && (
                <button className="bg-dark text-light px-4 py-2 rounded-full font-bold hidden sm:block">
                  <Link className="font-secondary" to="/create-quiz">
                    Create Your Quiz
                  </Link>
                </button>
              )}

              <div
                className="cursor-pointer flex items-center relative"
                onClick={() => setDropOpen((prev) => !prev)}
                ref={menuRef}
              >
                {notifications.length > 0 && (
                  <div className="absolute top-0 right-[30%] bg-dark size-5 rounded-full text-light flex justify-center items-center font-secondary font-bold">
                    {notifications.length}
                  </div>
                )}
                <img
                  className="border-dark size-10 border-1 border rounded-full"
                  src={`${BASE_URL}/avatars/${user.avatar}.png`}
                  alt=""
                />
                <MdKeyboardArrowDown className="w-6 h-6" />
              </div>
            </div>

            {dropOpen && (
              <div className="absolute bg-dark text-light top-[50px] xsm:top-[70px] transition-all right-0 w-[200px] p-3 rounded-lg">
                <ul className="flex flex-col w-full" ref={linksRef}>
                  <li className="w-full rounded-md">
                    <Link
                      to="/profile"
                      className="block w-full py-2 px-2 rounded-md hover:bg-dark-2"
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="w-full rounded-md">
                    <Link
                      to="/create-quiz"
                      className="block w-full py-2 px-2 rounded-md hover:bg-dark-2 sm:hidden"
                    >
                      Create Quiz
                    </Link>
                  </li>

                  {notifications.length > 0 && (
                    <li className="w-full rounded-md">
                      <Link
                        to="/profile/notifications"
                        className="block w-full py-2 px-2 rounded-md hover:bg-dark-2"
                      >
                        Notifications ({notifications.length})
                      </Link>
                    </li>
                  )}

                  <li className="w-full">
                    <p
                      className="block w-full py-2 px-2 rounded-md hover:bg-dark-2 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
      )}

      <Outlet />
    </>
  );
}
