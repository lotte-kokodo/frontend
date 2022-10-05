import React, { useState, useEffect } from "react"
import {BrowserRouter, Link, Routes, Route} from "react-router-dom"

import Login from "./Components/Member/login"
import OrderDetailList from "./Components/Order/orderDetailList";
import OrderList from "./Components/Order/orderList";

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
            <Route path="/orderList" element={<OrderList />}></Route>
            <Route path="/orderDetailList" element={<OrderDetailList />}></Route>
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
