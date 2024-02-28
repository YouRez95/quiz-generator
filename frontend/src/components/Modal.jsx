import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({ fullname }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);

  return (
    <div className="fixed text-light top-0 left-0 w-screen h-screen z-20 flex items-center justify-start">
      <div className="bg-dark opacity-[.6] absolute w-full h-full" />
      <p className="bg-dark relative p-10 rounded-2xl ml-10">
        Thanks {fullname} <br />
        Thank you for filling out our sign up form. We are glad that you joined
        us
      </p>
    </div>
  );
}
