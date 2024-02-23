import React from "react";

export default function SubTitleQuiz({ icon, title }) {
  const Icon = icon;
  return (
    <h2 className="text-gray-600 flex items-center gap-3 text-2xl font-semibold mb-10">
      <Icon className="border border-1 rounded-full p-1 text-3xl" />
      <span className="font-secondary underline">{title}</span>
    </h2>
  );
}
