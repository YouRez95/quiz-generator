import { useState, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function InputWithEmojis({
  titleInput,
  setTitleInput,
  tagHtml,
  ...props
}) {
  const inputRef = useRef();
  const [isFocus, setIsFocus] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  function handleFocusInput() {
    setIsFocus(true);
  }

  function handleShowEmojis(e) {
    setIsFocus(true);
    inputRef.current.focus();
    setShowEmojis((prev) => !prev);
  }

  function handleEmojiSelect(e) {
    const unifiedCode = e.native;
    setTitleInput((prev) => prev + unifiedCode);
  }

  return (
    <div className="relative max-w-[500px]">
      {isFocus && (
        <div
          className="absolute hidden sm:block bg-white z-10 -right-4 top-[0%] border rounded-full w-7 h-7 text-center cursor-pointer"
          onClick={handleShowEmojis}
        >
          <span className="w-full h-full text-xl">+</span>
        </div>
      )}
      {tagHtml === "input" ? (
        <input
          onFocus={handleFocusInput}
          ref={inputRef}
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          {...props}
        />
      ) : (
        <textarea
          onFocus={handleFocusInput}
          ref={inputRef}
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          {...props}
        />
      )}
      {showEmojis && (
        <div className="absolute -right-0 z-20  w-fit shadow-lg shadow-white rounded-lg">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            className="bg-white"
            theme="light"
          />
        </div>
      )}
    </div>
  );
}
