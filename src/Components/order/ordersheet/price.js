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

  const productId = product.id;
  const [ totalPrice, setTotalPrice ] = useState(product.price * qty);

  const { rateDiscountPolicy } = useContext(OrderContext);

  useEffect(() => {
    console.log(rateDiscountPolicy);
    console.log(product);
    console.log(qty);
    calcDiscountPrice();
  }, []);


  const calcDiscountPrice = () => {
    console.log("policy " + productId);

    console.log("policy " + rateDiscountPolicy[productId]);
    setTotalPrice(rateDiscountPolicy[productId] ?
            Math.floor(totalPrice*((100-rateDiscountPolicy[productId])*0.01))
            :
            totalPrice
    );

  }

  return (
      <>
        <span>{totalPrice}</span><br/><br/>
      </>
  )

}

export default Price