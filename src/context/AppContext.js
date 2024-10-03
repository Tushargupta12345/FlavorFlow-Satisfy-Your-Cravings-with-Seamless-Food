import { createContext, useState } from "react";

// creating the context
export const AppContext = createContext();

// creating the provider
export const AppContextProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState("Login");

  const value = {
    loginStatus,
    setLoginStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// now just wrap the app in this provider and you are free to use it anywhere inside the app 😎