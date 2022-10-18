/**
 * '결제정보' 컴포넌트
 */

// Context
import {OrderContext} from "../../../context/orderProvider";

// Module
import {useContext, useEffect, useState} from "react"

const Payment = (props) => {

  const { orderProductMap, checkCoupons, fixDiscountPolicy } = useContext(OrderContext);

  const productQtyMap = props.productQtyMap;

  const [ totalPrice, setTotalPrice ] = useState(999999);
  const [ discPrice, setDiscPrice ] = useState(0);
  const [ delPrice, setDelPrice ] = useState(999999);
  const [ payPrice, setPayPrice ] = useState(999999);

  useEffect(() => {
    calcPaymentPrice();
  }, [orderProductMap.length, checkCoupons.length]);

  const calcPaymentPrice = () => {
    console.log("calcPrice");
    // 상품 총 금액 계산
    let tPrice = 0;
    Object.values(orderProductMap).map((product) => {
      tPrice += product.unitPrice*productQtyMap[product.productId];
    });
    setTotalPrice(tPrice);

    // 총 할인금액 계산
    let discPrice = 0;
    Object.values(orderProductMap).map((product) => {
      const productTotalPrice = product.unitPrice*productQtyMap[product.productId];

      if (product.discRate !== 0) {
        discPrice += Math.floor(productTotalPrice * (product.discRate*0.01));
      }

      // 사용자가 비율 할인쿠폰을 선택했다면
      const coupon = checkCoupons[product.productId];
      if (coupon && coupon.rate && productTotalPrice >= coupon.minPrice) {
        discPrice += Math.floor(productTotalPrice * (coupon.rate*0.01));
      }
    });
    setDiscPrice(discPrice);

    // 배송비 계산
    const sellers = [];
    Object.values(orderProductMap).map((product) => {
      if (!sellers.includes(product.sellerId)) {
        sellers.push(product.sellerId);
      }
    });

    let delPrice = 0;
    sellers.map((sellerId) => {
      if (!fixDiscountPolicy[sellerId]) {
        delPrice += 3000;
      }
    });
    setDelPrice(delPrice);

    setPayPrice(tPrice-discPrice-delPrice);
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
            <td>{delPrice} 원</td>
          </tr>
          </tbody>
        </table>
        <hr/>
        <div>
          <span>{payPrice} 원</span>
        </div>
      </>
  )
}

export default Payment
