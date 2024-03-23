import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

export default function PasswordForm({ id, onChange }) {
  const [typePassword, setTypePassword] = useState("password");
  return (
    <div className="flex flex-col gap-2 max-w-[700px]">
      <label htmlFor="password" className="text-xl font-extralight text-light">
        Password
      </label>
      <div className="relative">
        <input
          onChange={(e) => onChange(e.target.value, id)}
          type={typePassword}
          id="password"
          className="py-2 px-3 rounded-sm bg-light outline-none text-dark font-secondary w-full max-w-[700px]"
        />
        <span
          className="absolute right-4 top-2 size-5 text-dark-2 font-secondary cursor-pointer uppercase"
          onClick={() =>
            setTypePassword((prev) =>
              prev === "password" ? "text" : "password"
            )
          }
        >
          {typePassword === "password" ? (
            <BiShow className="w-full h-full" />
          ) : (
            <BiHide className="w-full h-full" />
          )}
        </span>
      </div>
    </div>
  );
}
