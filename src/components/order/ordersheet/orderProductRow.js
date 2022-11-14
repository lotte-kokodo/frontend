import CheckBox from "../cart/checkBox";
import Price from "./price";
import {useEffect} from "react";

/**
 * '주문상품' 컴포넌트
 */

 const OrderProductRow = (props) => {

  const product = props.product;
  const qty = props.qty;

  return (
      <div className="row">
       <div className="col-2">
        <img className="order-product-img" src={product.thumbnail} alt={product.name} />
       </div>
       <div className="col-5">
        <span>{product.name}</span>
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