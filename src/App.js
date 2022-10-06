import React, { useState, useEffect } from "react"
import {BrowserRouter, Link, Routes, Route} from "react-router-dom"

import Login from "./Components/Member/login"
import OrderSheet from "./Components/Order/OrderSheet"

import AuthProvider from "./Context/AuthProvider"

function App() {
  return (
    <div>

      <header>
        <div><br /><br /></div>
      </header>

      <BrowserRouter>
        <AuthProvider>
          <nav>
            <div><br /><br /></div>
          </nav>

          
            <main>
            <div className="container">
              <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/ordersheet" element={<OrderSheet />}></Route>
              </Routes>
            </div>
            </main>
            </AuthProvider>
        </BrowserRouter>
      <footer>
      </footer>
    </div>
  );
}

export default App;
