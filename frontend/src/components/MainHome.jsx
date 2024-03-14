import React from "react";
export default function MainHome() {
  return (
    <div className="layer flex gap-10 relative z-10">
      <div className="grid gap-16 mt-[6rem] flex-2">
        <h1 className="text-6xl leading-[5.4rem] tracking-wider text-light font-extrabold">
          Good
          <span className="font-secondary border text-dark border-light px-1 mx-2 bg-light">
            Question
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

        <div>
          <button className="relative px-7 py-3 text-white border-light border overflow-hidden font-bold group">
            <div className="bg-light absolute w-full h-full top-0  transition-all -left-[100%] group-hover:left-0" />
            <div className="relative font-secondary text-light group-hover:text-dark">
              Create Your Quiz
            </div>
          </button>
        </div>
      </div>

      <div className="flex-1 grid gap-2 m-2 grid-cols-20">
        {/* the symbol ? will display here */}
      </div>
    </div>
  );
}
