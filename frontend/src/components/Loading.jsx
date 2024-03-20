import React from "react";

import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="min-h-[200px] flex justify-center items-center">
      <ClipLoader color="#12372A" />
    </div>
  );
}
