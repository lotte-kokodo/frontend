/**
 * '가격정보' 컴포넌트
 */

// Provider
import { OrderContext } from "../../../context/OrderProvider";

// Module
import { useContext, useEffect, useState } from "react"


const Price = (props) => {

  const product = props.product;
  const qty = props.qty;

  const unitPrice = product.unitPrice;
  const discRate = product.discRate;

  const totalPrice = unitPrice*qty;
  const [ discPrice, setDiscPrice ] = useState(0);


  useEffect(() => {
    console.log(product);
    console.log(qty);
    calcDiscPrice();
  }, []);


  const calcDiscPrice = () => {
    setDiscPrice(discRate !== 0 ?
            Math.floor(totalPrice*(1-discRate*0.01)) : totalPrice);
  }

  return (
      <>
        <span>{discPrice}</span><br/><br/>
      </>
  )

}

export default Price