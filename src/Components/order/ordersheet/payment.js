/**
 * '결제정보' 컴포넌트
 */

// Context
import { OrderContext } from "../../../context/OrderProvider";


// Module
import { useContext, useEffect, useState } from "react"


const Payment = (props) => {

  const { orderProducts, rateDiscountPolicy } = useContext(OrderContext);

  const productQtyMap = props.productQtyMap;
  const [ totalPrice, setTotalPrice ] = useState(999999);
  const [ discountPrice, setDiscountPrice ] = useState(0);
  const [ deliveryPrice, setDeliveryPrice ] = useState(999999);
  const [ paymentPrice, setPaymentPrice ] = useState(999999);


  useEffect(() => {
    print();
    calcPaymentPrice();
  }, [orderProducts]);


  const calcPaymentPrice = () => {
    // 상품 총 금액 계산
    let tPrice = 0;
    orderProducts.map((product) => tPrice += product.price*productQtyMap[product.id]);
    setTotalPrice(tPrice);

    // 총 할인금액 계산
    let discPrice = 0;
    orderProducts.map((product) => {
      if (rateDiscountPolicy[product.id]) {
        discPrice += Math.floor(product.price*productQtyMap[product.id] * (rateDiscountPolicy[product.id]*0.01));
        console.log(product.price*productQtyMap[product.id] * (rateDiscountPolicy[product.id]*0.01));
      }
    });
    setDiscountPrice(discPrice);
    setPaymentPrice(tPrice-discPrice);
    // TODO 배송비 계산
  }

  const print = () => {
    console.log("*** payment");
    console.log(orderProducts);
    console.log(rateDiscountPolicy);
  }

  return (
      <>
        <h5>결제예정금액</h5><br/>
        <table>
          <tbody>
          <tr>
            <td>상품금액</td>
            <td>{totalPrice}</td>
          </tr>
          <tr>
            <td>상품할인금액</td>
            <td>{discountPrice}</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>{}</td>
          </tr>
          </tbody>
        </table>
        <hr/>
        <div>
          <span>{paymentPrice} 원</span>
        </div>
      </>
  )
}

export default Payment
