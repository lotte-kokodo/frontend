
// Module
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {OrderContext} from "../../../context/orderProvider";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";
import axios from "axios";

import "../../../pages/client/order/css/order.css"


// Provider

const OrderButton = () => {

  const { url } = useContext(ServerConfigContext);
  const { headers } = useContext(AuthContext);
  const navigate = useNavigate();

  let cartIds = [];
  let productIds  = [];
  let productQtyMap = {};
  const { checkCartMap, setRateDiscountPolicyMap, setFixDiscountPolicyMap } = useContext(OrderContext);

  const getOrdersheet = async () => {

    const api = url + "/member-service/member/check/info";
    axios.get(api, { headers: headers })
        .then((resp) => {
          const isMemberInfoApplied = resp.data;
          if (isMemberInfoApplied) {
            createOrderProductInfo();
            navigate("/ordersheet",
                {state: { cartIds: cartIds, productIds: productIds, productQtyMap: productQtyMap }})
          }
          else {
            alert("주문 전 배송정보 등록 필수");
            navigate("/mypageRead");
          }
        })
        .catch((err) => {
            console.log(err);
        });
  }

  const createOrderProductInfo = () => {
    [...checkCartMap.keys()].map((sellerId) => {
      checkCartMap.get(sellerId).map((cart) => {
        cartIds.push(cart.cartId);
        productIds.push(cart.productId);

        if (productQtyMap[cart.productId]) {
          productQtyMap[cart.productId] = productQtyMap[cart.productId] + cart.qty;
        }
        else {
          productQtyMap[cart.productId] = cart.qty;
        }
      })
    });
    setRateDiscountPolicyMap({});
    setFixDiscountPolicyMap({});
    // navigate("/ordersheet",
    //     {state: { cartIds: cartIds, productIds: productIds, productQtyMap: productQtyMap }})
  }

  return (
      <>
        <br/>
        <div  className="d-flex justify-content-end">
          <div className="btn btn-block order-btn" onClick={getOrdersheet}>
            주문하기
          </div>
        </div>

      </>
  )
}

export default OrderButton;