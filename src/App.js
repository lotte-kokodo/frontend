import React, { useState, useEffect } from "react"
import {BrowserRouter, Link, Routes, Route} from "react-router-dom"

import Login from "./Components/Member/login"

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
