import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    isLoading: true,
    width: 0,
  });
  const [slideNo, setSlideNo] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // useEffect(() => {
  //   if (window.localStorage.getItem("isFirstTime")) {
  //     setIsFirstTime(false);
  //   } else {
  //     window.localStorage.setItem("isFirstTime", false);
  //   }
  // }, []);
  useEffect(() => console.log({ slideNo }));
  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        isFirstTime,
        setIsFirstTime,
        slideNo,
        setSlideNo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
