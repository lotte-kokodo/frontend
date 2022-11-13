/**
 * '주문서' 페이지
 */

// Module
import axios from "axios";
import {useContext, useEffect, useState} from "react"

// Provider
import {OrderContext} from "../../../context/orderProvider";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";

// Component
import OrderProductRow from "./orderProductRow";


const OrderProductList = (props) => {

  const { url } = useContext(ServerConfigContext);
  const { headers } = useContext(AuthContext);
  const { orderProductMap, setOrderProductMap, setRateDiscountPolicyMap, setFixDiscountPolicyMap } = useContext(OrderContext);

  const productIds = props.productIds;
  const productQtyMap = props.productQtyMap;

  useEffect(() => {
    getOrderProducts();
  }, []);

  useEffect(() => {
    getRateDiscountPolicy();
    getFixDiscountPolicy();
  }, [orderProductMap]);

  const getOrderProducts = async () => {
    const api = url + "/product-service/product/ordersheet";

    await axios.get(api, { params: { productIds: productIds.join(",") }, headers: headers})
    .then((resp) => {
      const data = resp.data.result.data;

      setOrderProductMap(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // 바율할인 정책
  const getRateDiscountPolicy = async () => {

    const api = url + "/promotion-service/rate-discount/list";
    const params = {
      productIdList: productIds.join(",")
    }

    await axios.get(api, {params: params, headers: headers})
    .then((resp) => {

      const data = resp.data.result.data;
      setRateDiscountPolicyMap(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // 고정할인(배송비) 정책
  const getFixDiscountPolicy = async () => {

    const api = url + "/promotion-service/fix-discount/status";

    let productIdList = [];
    let sellerIdList = [];
    Object.keys(orderProductMap).map((productId) => {
      let orderProduct = orderProductMap[productId];
      productIdList.push(orderProduct.id);
      sellerIdList.push(orderProduct.sellerId);
    });

    const params = {
      productIdList: productIdList.join(","),
      sellerIdList : sellerIdList.join(",")
    }

    await axios.get(api, {params: params, headers: headers})
    .then((resp) => {
      const data = resp.data.result.data;
      setFixDiscountPolicyMap(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
      <>
        <h3>상품정보</h3>
        <hr/>
          {
            Object.values(orderProductMap).map((product, idx) => {
              return (
                  <OrderProductRow
                      product={product}
                      qty={productQtyMap[product.id]}
                      key={idx} />
              )
            })
          }
      </>
  );
}

export default OrderProductList;