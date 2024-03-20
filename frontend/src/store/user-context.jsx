import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [socketState, setSocketState] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // TODO: check the exipre time for token if is expired setUser(null) and setToken(null)

  useLayoutEffect(() => {
    setLoadingUser(true);
    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (userData) {
      setUser(userData.user);
      setToken(userData.token);
    }
    setLoadingUser(false);
  }, []);

  function handleUpdateUserInfo(data) {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  }

  function handleLogout() {
    localStorage.clear();
    document.location.href = "/";
  }
  const userValues = {
    user,
    setUser,
    handleLogout,
    token,
    handleUpdateUserInfo,
    loadingUser,
    setSocketState,
    socketState,
    setNotifications,
    notifications,
  };
  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  );
}
