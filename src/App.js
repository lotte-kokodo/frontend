import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Seller from "./pages/seller/js/seller"
import Client from "./pages/main/js/client"

function App() {
  
  return (
    <div>
    
      <BrowserRouter>
      
        <Routes>
          {/* Seller */}
          <Route path="/seller/*" element={<Seller />}></Route>

          {/* Customer */}
          <Route path="/*" element={<Client />}></Route>
        </Routes>
        
      </BrowserRouter>

    </div>
  );
}

export default App;