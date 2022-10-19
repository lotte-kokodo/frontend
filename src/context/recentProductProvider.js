import { createContext, useState } from "react";

export const RecentProductContext = createContext();

const RecentProductProvider = ({ children }) => {
  const [watchList, setWatch] = useState([]);
  const [watchImg, setImg] = useState([]);

  const value = { watchImg, setImg, watchList, setWatch };

  return (
      <RecentProductContext.Provider value = {value}>
        {children}
      </RecentProductContext.Provider>
  );

}

export default RecentProductProvider