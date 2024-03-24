import ButtonLtoR from "./ButtonLtoR";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import logoDark from "../assets/logo-dark.png";
import logoSingleDark from "../assets/logo-single-dark.png";
import logo from "../assets/logo-light.png";
import { useState } from "react";

export default function NavbarNotAuth() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-light bg-dark sticky top-0 z-20 px-3 md:px-0">
      <div className="flex justify-between h-[50px] xsm:h-[70px] items-center layer">
        <Link to="/" className="" onClick={() => setMenuOpen(false)}>
          <img
            src={logo}
            className="w-[90px] xsm:w-[100px] md:w-[140px]"
            alt=""
          />
        </Link>
        <div className="gap-7 hidden md:flex items-center font-medium">
          <ButtonLtoR to="/register">Register</ButtonLtoR>
          <Link to="/login">
            <div className="text-light bg-black px-7 py-1 md:px-10 md:py-2 rounded-full cursor-pointer border border-light">
              Login
            </div>
          </Link>
        </div>
        <div
          className="bg-light size-6 xsm:size-7 flex justify-center items-center cursor-pointer md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <IoCloseOutline className="w-full h-full" />
          ) : (
            <IoIosMenu className="w-full h-full" />
          )}
        </div>
        <div
          className={`fixed top-[50px] xsm:top-[70px] h-[100vh] bg-white w-[90vw] xsm:w-[300px] sm:w-[350px] rounded-l block md:hidden transition-all duration-300 ease-in-out
              ${menuOpen ? "right-0" : "-right-[150%]"}
            `}
        >
          <div className="ml-1 mr-1 mb-3 h-[90vh] rounded-b-lg border-b border-x relative overflow-hidden">
            <div className="bg-white border-b rounded-xl border-dark py-3 flex justify-center">
              <img
                src={logoDark}
                alt="logo"
                className="items-center w-[80px] xsm:max-w-[100px]"
              />
            </div>

            <div className="flex flex-col">
              <Link
                to="/register"
                className="border-b font-bold  text-[16px] xsm:text-lg font-secondary border-dark px-3 py-5 hover:bg-light"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="border-b font-bold text-[16px] xsm:text-lg font-secondary border-dark px-3 py-5 hover:bg-light"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </div>
            <div className="size-[100px] absolute -bottom-6 -right-6 opacity-20 animation-rotate-inverse">
              <img src={logoSingleDark} alt="" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
