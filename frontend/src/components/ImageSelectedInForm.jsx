import { useState } from "react";
import { RiUpload2Line } from "react-icons/ri";
export default function ImageSelectedInForm({ setFile }) {
  const [image, setImage] = useState();
  const handleChangeImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className=" flex flex-col">
      <p className="text-md font-bold font-secondary">
        Choose a profile picture for your quiz
      </p>
      <label
        className="w-10 h-10 rounded-full border flex justify-center items-center cursor-pointer self-center mt-2"
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
      {image && (
        <img src={image} alt="" className="w-60 cover self-center mt-2" />
      )}
    </div>
  );
}