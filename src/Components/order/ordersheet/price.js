/**
 * '가격정보' 컴포넌트
 */

// Module
import { useEffect, useState } from "react"


const Price = (props) => {

  const product = props.product;
  const qty = props.qty;

  const unitPrice = product.unitPrice;
  const discRate = product.discRate;

  const totalPrice = unitPrice*qty;
  const [ discPrice, setDiscPrice ] = useState(0);


  useEffect(() => {
    calcDiscPrice();
  });


  const calcDiscPrice = () => {
    setDiscPrice(discRate !== 0 ?
            Math.floor(totalPrice*(1-discRate*0.01)) : totalPrice);
  }

  return (
      <>
        <span>{discPrice} 원</span><br/><br/>
      </>
  )

}

export default Price