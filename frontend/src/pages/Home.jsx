import React, { useContext, useState } from "react";
import { UserContext } from "../store/user-context";
import HomeNotAuth from "./HomeNotAuth";
import HomeAuth from "./HomeAuth";
import Loading from "../components/Loading";

export default function Home() {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) return <Loading />;
  return (
    <>
      {!user && <HomeNotAuth />}

      {user && <HomeAuth />}
    </>
  );
}
