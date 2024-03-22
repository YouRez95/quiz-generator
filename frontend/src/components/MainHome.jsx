import React from "react";
import { Link } from "react-router-dom";
export default function MainHome() {
  return (
    <div className="layer flex justify-center xmd:justify-start gap-10 relative z-10">
      <div className="grid gap-10 mt-[2rem] xsm:mt-[5rem] mb-[3rem] flex-2 text-center xmd:text-left md:ml-0">
        <div className="grid gap-5">
          <h1 className="text-lg xsm:text-2xl sm:text-4xl leading-8 xsm:leading-10 sm:leading-[50px] tracking-wider text-light font-extrabold">
            Good
            <span className="font-secondary border text-dark border-light px-1 mx-2 bg-light">
              Questions
            </span>
            is
            <span className="font-secondary border text-dark border-light mx-2 px-1 bg-light">
              All
            </span>
            <br /> you
            <span className="font-secondary border text-dark border-light mx-2 px-1 bg-light">
              Need
            </span>
          </h1>

          <p className="text-light font-secondary text-sm sm:text-[18px]">
            Create, Play, Enjoy...
          </p>
        </div>

        <div>
          <button className="relative px-5 xsm:px-7 py-2 xsm:py-3 text-white border-light border overflow-hidden font-bold group">
            <div className="bg-light absolute w-full h-full top-0  transition-all -left-[100%] group-hover:left-0" />
            <Link
              to="/register"
              className="relative text-sm font-secondary text-light group-hover:text-dark"
            >
              Create Your Quiz
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
