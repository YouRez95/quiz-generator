import React from "react";
import { Link } from "react-router-dom";

export default function ButtonLtoR({ to, children, ...props }) {
  return (
    <Link to={to} {...props}>
      <div className="border px-7 py-1 md:px-10 sm:py-2 cursor-pointer relative rounded-full overflow-hidden group text-light border-light hover:text-dark">
        <div className="absolute bg-light w-full h-full border-light -bottom-[100%] right-0 group-hover:bottom-0 duration-100" />
        <div className="relative">{children}</div>
      </div>
    </Link>
  );
}
