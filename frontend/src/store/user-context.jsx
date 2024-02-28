import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"))?.user;
    setUser(userData);
  }, []);

  function handleLogout() {
    localStorage.clear();
    document.location.href = "/";
  }
  const userValues = {
    user,
    setUser,
    handleLogout,
  };
  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  );
}
