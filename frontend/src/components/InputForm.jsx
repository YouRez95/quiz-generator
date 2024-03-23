import React from "react";

export default function InputForm({ id, type, placeholder, text, onChange }) {
  return (
    <div className="flex flex-col gap-2 max-w-[700px]">
      <label htmlFor={id} className="text-xl font-extralight text-light">
        {text}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="py-2 px-3 rounded-sm bg-light outline-none text-dark font-secondary max-w-[700px]"
        onChange={(e) => onChange(e.target.value, id)}
      />
    </div>
  );
}
