import React from "react"
import {Route, Routes} from "react-router-dom"

import Header from './header'
import Nav from './nav'
import RecentProduct from './recentPrdocut'
import Home from "./home"

import Login from "../../member/js/login"
import Signup from "../../member/js/signup"
import Mypage from "../../member/js/mypage"
import MypageRead from "../../member/js/mypageRead"

import Category from '../../product/js/category'
import MdRecommendation from '../../product/js/mdRecomendation'
import Sale from '../../product/js/sale'
import Search from "../../product/js/search"
import ProductDetail from "../../product/js/productDetail"

import GetOrderList from "../../order/js/orderList"
import "../css/header.css"
import Cart from "../../order/js/cart";
import OrderSheet from "../../order/js/orderSheet";
import AuthProvider from "../../../../context/authProvider";
import OrderProvider from "../../../../context/orderProvider";
import RecentProductProvider from "../../../../context/recentProductProvider";
import OrderDetailList from "../../order/js/orderDetailList";
import Footer from "./footer";

import ServerConfigProvider from "../../../../context/serverConfigProvider";

function Client() {
  return(
      <div>
      <ServerConfigProvider>
        <Header />
        {/* <Nav /> */}

        <RecentProductProvider>
          <main>
            <div>
              <RecentProduct />

              <AuthProvider>
                  <Routes>
                    <Route path="/" element={<Home />}></Route>

                    {/* member - login, signup */}
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/mypage" element={<Mypage />}></Route>
                    <Route path="/mypageRead" element={<MypageRead />}></Route>

                    {/* product - search, category, detail */}
                    <Route path='/search' element={<Search />}></Route>
                    <Route path="/category" element={<Category />}></Route>

                    <Route path="/mdRecommendation" element={<MdRecommendation />}></Route>
                    <Route path="/sale" element={<Sale />}></Route>
                    <Route path="/productDetail/:productId" element={<ProductDetail />}></Route>

                    {/* order - orderList */}
                    <Route path="/orderList" element={<GetOrderList />}></Route>
                    <Route path="/orderDetailList" element={<OrderDetailList />}></Route>

                  </Routes>
              </AuthProvider>

              <AuthProvider>

                  <OrderProvider>
                    <Routes>
                      {/* order - cart, orderSheet */}
                      <Route path="/cart" element={<Cart />}></Route>
                      <Route path="/ordersheet" element={<OrderSheet />}></Route>
                    </Routes>
                  </OrderProvider>
                </AuthProvider>

              </div>
            </main>
          </RecentProductProvider>



        <footer>
          <Footer></Footer>
        </footer>
      </ServerConfigProvider>
      </div>
  )
}

export default Client;