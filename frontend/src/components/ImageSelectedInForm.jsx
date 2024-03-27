import { useState } from "react";
import { RiUpload2Line } from "react-icons/ri";
export default function ImageSelectedInForm({ setFile, prevImage }) {
  const [image, setImage] = useState();
  const handleChangeImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <p className="text-sm md:text-base font-bold font-secondary">
        {prevImage
          ? "Choose another profile picture for your quiz"
          : "Choose a profile picture for your quiz"}
      </p>
      <label
        className="w-10 h-10 rounded-full border flex justify-center items-center cursor-pointer self-start ml-10 3xl:ml-0 3xl:self-center mt-2"
        htmlFor="back-img"
      >
        <RiUpload2Line className="flex" />
      </label>
      <input
        hidden
        type="file"
        id="back-img"
        name="back-img"
        accept="image/png, image/jpeg"
        onChange={handleChangeImg}
      />
      {prevImage && !image && (
        <img
          src={prevImage}
          alt=""
          className="w-60 cover self-start 3xl:self-center mt-2"
        />
      )}
      {image && (
        <img
          src={image}
          alt=""
          className="w-60 cover self-center mt-2 rounded-lg"
        />
      )}
    </div>
  );
}
