import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // useEffect(() => {
  //   if (window.localStorage.getItem("isFirstTime")) {
  //     setIsFirstTime(false);
  //   } else {
  //     window.localStorage.setItem("isFirstTime", false);
  //   }
  // }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoading, setIsLoading, isFirstTime, setIsFirstTime }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
