import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    isLoading: true,
    width: 0,
  });
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
      value={{ loading, setLoading, isFirstTime, setIsFirstTime }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
