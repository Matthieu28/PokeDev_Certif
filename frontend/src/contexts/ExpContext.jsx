import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCurrentUserContext } from "./CurrentUserContext";

const ExpContext = createContext();

export function ExpContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [xpBar, setXpBar] = useState(0);
  const { currentUser } = useCurrentUserContext();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/all/${currentUser.id}`
        );
        setUserInfo(data);
      } catch (err) {
        console.error(err);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const updateLevelAccount = async () => {
      if (userInfo.totalXp >= userInfo.xpLimit) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${currentUser.id}`,
            {
              totalXp: 0,
              levelAccount: userInfo.levelAccount + 1,
              xpLimit: userInfo.xpLimit * 1.5,
            }
          );
          setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            ...response.data,
          }));
          setXpBar(0);
        } catch (err) {
          console.error(err);
        }
      }
    };
    updateLevelAccount();
  }, [userInfo.totalXp, userInfo.xpLimit, currentUser.id]);

  useEffect(() => {
    const getXpBar = () => {
      const xpDiff = (userInfo.totalXp * 100) / userInfo.xpLimit;
      setXpBar(xpDiff);
    };
    getXpBar();
  }, [userInfo.totalXp, userInfo.xpLimit]);

  const expContextValue = useMemo(() => {
    return { userInfo, setUserInfo, xpBar, setXpBar };
  }, [userInfo, setUserInfo, xpBar]);

  return (
    <ExpContext.Provider value={expContextValue}>
      {children}
    </ExpContext.Provider>
  );
}

export function useExpContext() {
  return useContext(ExpContext);
}
