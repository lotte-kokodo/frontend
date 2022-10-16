import CheckBox from "../cart/checkBox";
import Price from "./price";
import {useEffect} from "react";

/**
 * '주문상품' 컴포넌트
 */

 const OrderProductRow = (props) => {

  const product = props.product;
  const qty = props.qty;

  useEffect(() => {
    console.log("row " + product);
    console.log("qty " + qty);
  })
  return (
      <div className="row">
       <div className="col-2">
        <img className="order-product-img" src={product.productThumbnail} alt={product.productName} />
       </div>
       <div className="col-5">
        <span>{product.productName}</span>
       </div>
        <div className="col-2">
          수량 {qty}
        </div>
       <div className="col-3">
        <Price
            product={product}
            qty={qty}/>
       </div>
      </div>
  )

 }

 export default OrderProductRow