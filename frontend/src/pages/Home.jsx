import React, { useContext, useState } from "react";
import { UserContext } from "../store/user-context";
import HomeNotAuth from "./HomeNotAuth";
import HomeAuth from "./HomeAuth";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <>
      {!user && <HomeNotAuth />}

      {user && <HomeAuth />}
    </>
  );
}
