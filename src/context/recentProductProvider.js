import { createContext, useState } from "react";

export const RecentProductContext = createContext();

const RecentProductProvider = ({ children }) => {
  const [watchList, setWatch] = useState(JSON.parse(localStorage.getItem("watchId")));
  const [watchImg, setImg] = useState(JSON.parse(localStorage.getItem("watchImage")));

  const value = { watchImg, setImg, watchList, setWatch };

  return (
      <RecentProductContext.Provider value = {value}>
        {children}
      </RecentProductContext.Provider>
  );

}

export default RecentProductProvider