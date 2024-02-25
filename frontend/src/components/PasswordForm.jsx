import React from "react";

export default function PasswordForm({
  id,
  typePassword,
  setTypePassword,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="password" className="text-xl font-extralight text-light">
        Password
      </label>
      <div className="relative w-[600px]">
        <input
          onChange={(e) => onChange(e.target.value, id)}
          type={typePassword}
          id="password"
          className="py-2 px-3 rounded-sm bg-light outline-none text-dark font-secondary w-[600px]"
        />
        <span
          className="absolute right-2 top-2 text-dark-2 font-secondary cursor-pointer uppercase"
          onClick={() =>
            setTypePassword((prev) =>
              prev === "password" ? "text" : "password"
            )
          }
        >
          {typePassword === "password" ? "show" : "hidden"}
        </span>
      </div>
    </div>
  );
}
