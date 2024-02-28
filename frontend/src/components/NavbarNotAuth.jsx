import ButtonLtoR from "./ButtonLtoR";
import { Link } from "react-router-dom";

export default function NavbarNotAuth() {
  return (
    <header className="border-b-2 border-light bg-dark sticky top-0 z-20">
      <div className="flex justify-between h-[70px] items-center layer">
        <Link to="/">
          <h1 className="font-semibold text-3xl flex gap-1">
            <span className="font-secondary text-dark bg-light px-2 inline-block">
              ?
            </span>
            <span className="self-end font-secondary text-light">Ouizzz</span>
          </h1>
        </Link>
        <div className="flex gap-10 items-center font-medium">
          <ButtonLtoR to="/register">Register</ButtonLtoR>
          <Link to="/login">
            <div className="text-light bg-black px-10 py-2 rounded-full cursor-pointer border border-light">
              Login
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
