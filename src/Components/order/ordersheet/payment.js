/**
 * '결제정보' 컴포넌트
 */

// Context
import {OrderContext} from "../../../context/orderProvider";

// Module
import {useContext, useEffect, useState} from "react"

const Payment = (props) => {

  const { orderProducts, checkCoupons } = useContext(OrderContext);

  const productQtyMap = props.productQtyMap;
  const [ totalPrice, setTotalPrice ] = useState(999999);
  const [ discPrice, setDiscPrice ] = useState(0);
  const [ deliveryPrice, setDeliveryPrice ] = useState(999999);
  const [ paymentPrice, setPaymentPrice ] = useState(999999);

  useEffect(() => {
    calcPaymentPrice();
  }, [orderProducts, checkCoupons.length]);

  const calcPaymentPrice = () => {
    // 상품 총 금액 계산
    let tPrice = 0;
    orderProducts.map((product) => {
      tPrice += product.unitPrice*productQtyMap[product.productId];
    });
    setTotalPrice(tPrice);

    // 총 할인금액 계산
    let dPrice = 0;
    orderProducts.map((product) => {
      if (product.discRate !== 0) {
        dPrice += Math.floor(product.unitPrice*productQtyMap[product.productId] * (product.discRate*0.01));
      }

      // 비율 할인 쿠폰이 적용 됐다면
      const coupon = checkCoupons[product.productId];
      if (coupon && coupon.rate) {
        dPrice += Math.floor(product.unitPrice*productQtyMap[product.productId] * (coupon.rate*0.01));
      }
    });
    setDiscPrice(dPrice);

    setPaymentPrice(tPrice-dPrice);

    // TODO 배송비 계산

  }

  return (
      <>
        <h3>결제예정금액</h3><hr/>
        <table>
          <tbody>
          <tr>
            <td>상품금액</td>
            <td>{totalPrice} 원</td>
          </tr>
          <tr>
            <td>상품할인금액</td>
            <td>-{discPrice} 원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>{} 원</td>
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
