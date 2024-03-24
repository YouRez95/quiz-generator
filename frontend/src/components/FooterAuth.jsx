import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import logoFooter from "../assets/logo-single-dark.png";
import { Link } from "react-router-dom";

export default function FooterAuth() {
  return (
    <footer className="bg-light min-h-[40vh] py-20 relative overflow-hidden flex justify-start items-center flex-col gap-10">
      <div className="w-[70px] h-[70px] lg:w-[100px] xl:w-[200px] absolute -top-[18px] -right-[18px]">
        <img
          src={logoFooter}
          alt="logo footer"
          className=" opacity-20 animation-rotate"
        />
      </div>

      <div className="w-[200px] h-[200px] absolute -bottom-[50px] -left-[50px] hidden xl:flex">
        <img
          src={logoFooter}
          alt="logo footer"
          className=" opacity-20 animation-rotate"
        />
      </div>

      <h1 className="text-daark font-secondary text-3xl xsm:text-9xl font-bold opacity-60">
        QUIZ
      </h1>
      <ul className="flex gap-7 text-xl xsm:text-2xl relative">
        <li className="flex justify-center items-center transition-all text-dark border-[.5px] border-dark p-1 hover:text-light hover:bg-dark hover:scale-110">
          <Link to="https://www.facebook.com">
            <FaFacebookF />
          </Link>
        </li>
        <li className="flex justify-center items-center transition-all text-dark border-[.5px] border-dark p-1 hover:text-light hover:bg-dark hover:scale-110">
          <Link to="https://www.instagram.com">
            <FaInstagram />
          </Link>
        </li>
        <li className="flex justify-center items-center transition-all text-dark border-[.5px] border-dark p-1 hover:text-light hover:bg-dark hover:scale-110">
          <Link to="https://www.twitter.com">
            <FaTwitter />
          </Link>
        </li>
        <li className="flex justify-center items-center transition-all text-dark border-[.5px] border-dark p-1 hover:text-light hover:bg-dark hover:scale-110">
          <Link to="https://www.youtube.com">
            <FaYoutube />
          </Link>
        </li>
      </ul>
    </footer>
  );
}

// top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
