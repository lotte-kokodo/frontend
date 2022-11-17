/**
 * '가격정보' 컴포넌트
 */

// Module
import {useContext, useEffect, useState} from "react"
import {OrderContext} from "../../../context/orderProvider";


const Price = (props) => {

  const product = props.product;
  const qty = props.qty;

  const { checkRateCoupons, rateDiscountPolicyMap, replaceNumberComma } = useContext(OrderContext);

  const totalPrice = product.price*qty;
  const [ discPrice, setDiscPrice ] = useState(0);

  const discountRate = rateDiscountPolicyMap[product.id] ? rateDiscountPolicyMap[product.id].rate : undefined

  useEffect(() => {
    calcDiscPrice();
  }, [checkRateCoupons]);


  const calcDiscPrice = () => {
    if (discountRate) {
      setDiscPrice(Math.floor(totalPrice*(1-0.01*discountRate)));
    }
    else {
      setDiscPrice(product.price*qty);
    }
  }

  return (
      <>
        <span>{replaceNumberComma(discPrice)} 원</span><br/><br/>
      </>
  )

}

export default Price