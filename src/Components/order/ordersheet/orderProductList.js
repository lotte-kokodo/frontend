/**
 * '주문서' 페이지
 */

// Module
import axios from "axios";
import {useContext, useEffect, useState} from "react"
import {useLocation} from "react-router-dom";

// Provider
import {CheckCartContext} from "../../../context/checkCartProvider";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import AuthProvider, {AuthContext} from "../../../context/authProvider";
import OrderProductRow from "./orderProductRow";



const OrderProductList = (props) => {

  const { url } = useContext(ServerConfigContext);
  const { rateDiscountPolicy, fixDiscountPolicy } = useContext(CheckCartContext);

  const productIds = props.productIds;
  const productQtyMap = props.productQtyMap;

  const [ products, setProducts ] = useState([]);

  const api = url + "/product-service/product/orderProducts";

  const getOrderProducts = async () => {
    await axios.get(api, { params: { productIds: productIds.join(",") }})
    .then((resp) => {
      console.log("[success] (OrderProductList) GET /product-service/orderProducts");
      const data = resp.data.result.data;

      console.log(data);
      setProducts(data);
    })
    .catch((err) => {
      console.log("[error] (OrderProductList) GET /product-service/orderProducts");
      console.log(err);
    });
  }

  useEffect(() => {
    console.log("orderProductList ");
    console.log(rateDiscountPolicy);
    getOrderProducts();
  }, [])

  return (
      <>
        <h3>상품정보</h3><br/>
        <hr/>
          {
            products.map((product, idx) => {
              return (
                  <OrderProductRow product={product} qty={productQtyMap[product.id]} key={idx} />
              )
            })
          }
      </>
  );
}

export default OrderProductList;