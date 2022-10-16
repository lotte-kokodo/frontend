
// Module
import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import {OrderContext} from "../../../context/OrderProvider";

// Provider

const OrderSheetButton = () => {

  // const [ productIds, setProductIds ] = useState([]);
  // const [productQtyMap, setProductQtyMap] = useState([]);
  let cartIds = [];
  let productIds  = [];
  let productQtyMap = {};
  const { checkProducts } = useContext(OrderContext);

  const createOrderProductInfo = () => {
    checkProducts.map((product) => {
      cartIds.push(product.cartId);
      productIds.push(product.productId);
      productQtyMap[product.productId] = product.qty;
    });
    console.log(productQtyMap);
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

export default OrderSheetButton;