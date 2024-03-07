import React, { useContext, useEffect } from "react";
import { UserContext } from "../store/user-context";
import Loading from "./Loading";

export default function DashboardStatistiques() {
  const { user } = useContext(UserContext);

  if (!user) return <Loading />;

  return (
    <div className="pt-20 font-bold text-xl flex gap-3">
      Welcome Back <p className="font-secondary">{user.username}</p>
    </div>
  );
}
