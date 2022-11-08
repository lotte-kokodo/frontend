import { createContext, useState } from "react";

export const ServerConfigContext = createContext();

const ServerConfigProvider = ({ children }) => {

   const [url, setUrl] = useState("http://api.kokodo.shop:80"); // local api gateway
   //useState("http://localhost:8001"); // local api gateway

   const value = { url, setUrl };

   return (
      <ServerConfigContext.Provider value = {value}>
         {children}
      </ServerConfigContext.Provider>
   );

}

export default ServerConfigProvider