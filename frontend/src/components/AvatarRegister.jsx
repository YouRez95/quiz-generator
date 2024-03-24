import React, { useState } from "react";
import { avatars } from "../data";

export default function AvatarRegister({ onChange, prevAvatar }) {
  const [avatarSelected, setAvatarSelected] = useState(
    +prevAvatar.split("")[prevAvatar.length - 1] || 1
  );

  function handleSelectAvatar(event, avatarId) {
    setAvatarSelected(avatarId);
    onChange(event.target.alt, "avatar");
  }
  return (
    <div className="flex flex-col gap-2 max-w-[700px]">
      <div className="text-xl font-extralight text-light">
        Choose your avatar
      </div>
      <div className="bg-light grid grid-cols-4 xsm:grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 3xl:grid-cols-7 p-2 gap-6 h-[200px] overflow-y-scroll rounded-sm">
        {avatars.map((avatar) => (
          <div key={avatar.id} className="size-18">
            <img
              onClick={(e) => handleSelectAvatar(e, avatar.id)}
              src={avatar.image}
              alt={avatar.name}
              className={`w-20 cursor-pointer ${
                avatar.id === avatarSelected &&
                "border-4 border-dark-2 rounded-full"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
