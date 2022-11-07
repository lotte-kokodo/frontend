/**
 * '결제정보' 컴포넌트
 */

// Context
import {OrderContext} from "../../../context/orderProvider";

// Module
import {useContext, useEffect, useState} from "react"

const Payment = (props) => {

  const { orderProductMap, checkRateCoupons, checkFixCoupons, rateDiscountPolicyMap, fixDiscountPolicyMap, replaceNumberComma, DELIVERY_PRICE} = useContext(OrderContext);

  const productQtyMap = props.productQtyMap;

  const [ totalPrice, setTotalPrice ] = useState(999999);
  const [ discountPrice, setDiscountPrice ] = useState(0);
  const [ deliveryPrice, setDeliveryPrice ] = useState(999999);
  const [ payPrice, setPayPrice ] = useState(999999);

  useEffect(() => {
    if (orderProductMap && rateDiscountPolicyMap && fixDiscountPolicyMap && checkRateCoupons && checkFixCoupons) {
      calcPaymentPrice();
    }
  }, [orderProductMap, rateDiscountPolicyMap, fixDiscountPolicyMap, checkRateCoupons, checkFixCoupons]);

  const calcPaymentPrice = () => {
    // 상품 총 금액 계산
    let tPrice = 0;
    Object.values(orderProductMap).map((product) => {
      tPrice += product.price*productQtyMap[product.id];
    });
    setTotalPrice(tPrice);

    // 총 할인금액 계산
    let discPrice = 0;
    Object.values(orderProductMap).map((product) => {
      const productTotalPrice = product.price * productQtyMap[product.id];

      let rateDiscountPolicy = rateDiscountPolicyMap[product.id];
      if (rateDiscountPolicy) {
        discPrice += Math.floor(productTotalPrice * (rateDiscountPolicy.rate*0.01));
      }

      // checkRateCoupons.map((coupon) => {
      //   if (coupon && coupon.rate && productTotalPrice >= coupon.minPrice) {
      //     discPrice += Math.floor(productTotalPrice * (coupon.rate*0.01));
      //   }
      // });
    });
    setDiscountPrice(discPrice);

    // 배송비 계산
    const sellerIds = [];
    Object.values(orderProductMap).map((product) => {
      if (!sellerIds.includes(product.sellerId)) {
        sellerIds.push(product.sellerId);
      }
    });

    let delPrice = 0;
    sellerIds.map((sellerId) => {
      if (notAppliedFixDiscountPolicy(sellerId)) {
        delPrice += DELIVERY_PRICE;
      }
    })
    setDeliveryPrice(delPrice);

    setPayPrice(tPrice-discPrice+delPrice);
  }

  const notAppliedFixDiscountPolicy = (sellerId) => {
    console.log(fixDiscountPolicyMap);
    return fixDiscountPolicyMap[sellerId] === false;
  }

  return (
      <>
        <h3>결제예정금액</h3><hr/>
        <table>
          <tbody>
          <tr>
            <td>상품금액</td>
            <td>{replaceNumberComma(totalPrice)} 원</td>
          </tr>
          <tr>
            <td>상품할인금액</td>
            <td>-{replaceNumberComma(discountPrice)} 원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>{replaceNumberComma(deliveryPrice)} 원</td>
          </tr>
          </tbody>
        </table>
        <hr/>
        <div>
          <span>{replaceNumberComma(payPrice)} 원</span>
        </div>
      </>
  )
}

export default Payment
