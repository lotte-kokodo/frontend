/**
 * '가격정보' 컴포넌트
 */

// Module
import {useContext, useEffect, useState} from "react"
import {OrderContext} from "../../../context/orderProvider";


const Price = (props) => {

  const product = props.product;
  const qty = props.qty;

  const { rateDiscountPolicyMap, replaceNumberComma } = useContext(OrderContext);

  const totalPrice = product.price*qty;
  const [ discPrice, setDiscPrice ] = useState(0);

  const discountRate = rateDiscountPolicyMap[product.id] ? rateDiscountPolicyMap[product.id].rate : 0

  useEffect(() => {
    calcDiscPrice();
  }, [rateDiscountPolicyMap]);


  const calcDiscPrice = () => {
    console.log(discountRate)
    if (discountRate) {
      setDiscPrice(Math.floor(totalPrice*(1-0.01*discountRate)));
    }
    else {
      setDiscPrice(product.price*qty);
    }
  }

  return (
      <>
        <span>{replaceNumberComma(discPrice)} 원</span> &nbsp;
        {
          discountRate ?
              <>
                <i className="far fa-question-circle"></i> &nbsp;
                <span>{discountRate} % 할인 적용</span>
              </>
              :
              <></>
        }
      </>
  )

}

export default Price