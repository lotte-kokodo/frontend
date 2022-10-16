/**
 * '주문서' 페이지
 */

// Module
import axios from "axios";
import {useContext, useEffect, useState} from "react"

// Provider
import {OrderContext} from "../../../context/OrderProvider";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";

// Component
import OrderProductRow from "./orderProductRow";


const OrderProductList = (props) => {

  const { url } = useContext(ServerConfigContext);
  const { headers, memberId } = useContext(AuthContext);
  const { setOrderProducts } = useContext(OrderContext);

  const productIds = props.productIds;
  const productQtyMap = props.productQtyMap;

  const [ products, setProducts ] = useState([]);

  const api = url + "/order-payment-service/orders/" + memberId + "/orderSheet";

  const getOrderProducts = async () => {
    await axios.get(api, { params: { productIds: productIds.join(",") }, headers: headers})
    .then((resp) => {
      console.log("[success] (OrderProductList) GET /order-payment-service/orderProducts");
      const data = resp.data.result.data;

      console.log(data);
      setProducts(data);
      setOrderProducts(data);
    })
    .catch((err) => {
      console.log("[error] (OrderProductList) GET /product-service/orderProducts");
      console.log(err);
    });
  }

  useEffect(() => {
    console.log("orderProductList ");
    getOrderProducts();
  }, [])

  return (
      <>
        <h3>상품정보</h3>
        <hr/>
          {
            products.map((product, idx) => {
              return (
                  <OrderProductRow
                      product={product}
                      qty={productQtyMap[product.productId]}
                      key={idx} />
              )
            })
          }
      </>
  );
}

export default OrderProductList;