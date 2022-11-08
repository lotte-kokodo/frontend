
import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Seller from "./pages/seller/main/js/seller"
import Client from "./pages/client/main/js/client"
import { ServerConfigContext } from "./context/serverConfigProvider";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Seller */}
          <Route path="/seller/:sellerId/*" element={<Seller />}></Route>

          {/* Customers */}
          <Route path="/*" element={<Client />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;