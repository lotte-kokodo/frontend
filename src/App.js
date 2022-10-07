import React, { useState, useEffect } from "react"
import {BrowserRouter, Link, Routes, Route} from "react-router-dom"

import Login from "./Components/Member/login"
import ProductDetail from "./Components/product/ProductDetail"

function App() {
  return (
    <div>

      <header>
        <div><br /><br /></div>
      </header>

      <BrowserRouter>
        <nav>
          <div><br /><br /></div>
        </nav>

        <main>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/product/detail/:productId" element={<ProductDetail />}></Route>
          </Routes>
        </div>
        </main>
      </BrowserRouter>
        
      <footer>
      </footer>
    </div>
  );
}

export default App;
