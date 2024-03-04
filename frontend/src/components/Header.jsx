import { Link, Outlet, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import NavbarNotAuth from "./NavbarNotAuth";
import { MdKeyboardArrowDown } from "react-icons/md";
export default function Header({ inCreateQuiz }) {
  const { user, handleLogout } = useContext(UserContext);
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <>
      {!user && <NavbarNotAuth />}

      {user && (
        <header className="border-b-2 border-dark bg-light sticky top-0 z-20">
          <div className="flex justify-between h-[70px] items-center layer relative">
            <Link to="/" className="w-[30px] text-lg h-[30px]">
              <p className="font-secondary text-center text-dark border-2 border-dark block font-extrabold">
                ?
              </p>
            </Link>

            <div className="flex gap-6">
              {!inCreateQuiz && (
                <button className="bg-dark text-light px-4 py-2 rounded-full font-bold">
                  <Link className="font-secondary" to="/create-quiz">
                    Create Your Quiz
                  </Link>
                </button>
              )}

              <div
                className="cursor-pointer flex items-center"
                onClick={() => setDropOpen((prev) => !prev)}
              >
                <img
                  className="border-dark w-10 h-10 border-1 border rounded-full"
                  src={`http://localhost:5000/avatars/${user.avatar}.png`}
                  alt=""
                />
                <MdKeyboardArrowDown className=" w-6 h-6" />
              </div>
            </div>

            {dropOpen && (
              <div className="absolute bg-dark text-light top-[70px] transition-all right-0 w-[200px] p-3 rounded-lg">
                <ul className="flex flex-col items-center w-full">
                  <li className="w-full hover:bg-dark-2 rounded-md">
                    <Link
                      to="/profile"
                      className="block w-full py-2  text-center"
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="w-full hover:bg-dark-2 rounded-md">
                    <p
                      className="block w-full py-2  text-center cursor-pointer"
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
