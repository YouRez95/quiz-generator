import React from "react";

export default function SubTitleQuiz({ icon, title }) {
  const Icon = icon;
  return (
    <h2 className="text-dark-2 flex items-center gap-3 font-semibold mb-5">
      <Icon className="border border-1 rounded-full p-1 text-2xl" />
      <span className="font-secondary underline text-xl">{title}</span>
    </h2>
  );
}
