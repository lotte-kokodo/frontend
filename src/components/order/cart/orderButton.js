
// Module
import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import {OrderContext} from "../../../context/orderProvider";

// Provider

const OrderButton = () => {

  let cartIds = [];
  let productIds  = [];
  let productQtyMap = {};
  const { checkCartMap, setRateDiscountPolicyMap, setFixDiscountPolicyMap } = useContext(OrderContext);

  const createOrderProductInfo = () => {
    [...checkCartMap.keys()].map((sellerId) => {
      checkCartMap.get(sellerId).map((cart) => {
        cartIds.push(cart.cartId);
        productIds.push(cart.productId);
        productQtyMap[cart.productId] = cart.qty;
      })
    });
    setRateDiscountPolicyMap({});
    setFixDiscountPolicyMap({});
  }

  return (
      <>
        <br/>
        <div className="row">
          <Link className="btn btn-danger btn-block"
                onClick={createOrderProductInfo}
                to="/ordersheet"
                state={{ cartIds: cartIds, productIds: productIds, productQtyMap: productQtyMap }}>
              주문하기
          </Link>
        </div>
      </>
  )
}

export default OrderButton;