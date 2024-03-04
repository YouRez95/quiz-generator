import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // TODO: check the exipre time for token if is expired setUser(null) and setToken(null)

  useLayoutEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData.user);
      setToken(userData.token);
    }
  }, []);

  function handleLogout() {
    localStorage.clear();
    document.location.href = "/";
  }
  const userValues = {
    user,
    setUser,
    handleLogout,
    token,
  };
  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  );
}
