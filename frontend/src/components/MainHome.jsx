import React from "react";

// const quizLetter = [];
// function randomCharacter() {
//   for (let i = 0; i < 200; i++) {
//     const myNum = Math.floor(Math.random() * 10);
//     quizLetter.push({
//       num: myNum,
//       letter: "?",
//     });
//   }
// }
export default function MainHome() {
  return (
    <div className="layer flex gap-10">
      <div className="grid gap-10 mt-[6rem] flex-2">
        <h1 className="text-6xl leading-[4rem] tracking-wider text-black font-extrabold">
          Good Question is All <br /> you Need
        </h1>

        <div>
          <button className="relative px-7 py-3 text-white border-black border overflow-hidden font-bold group">
            <div className="bg-black absolute w-full h-full top-0 left-0 transition-all group-hover:-left-[100%]" />
            <div className="relative font-secondary group-hover:text-black">
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
