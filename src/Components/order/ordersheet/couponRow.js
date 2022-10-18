
import { useContext, useState } from "react"
import { OrderContext } from "../../../context/orderProvider";

const CouponRow = (props) => {

  const coupon = props.coupon;
  const productQtyMap = props.productQtyMap;

  const [ isChecked, setChecked ] = useState(false);
  const { orderProductMap, checkCoupons, setCheckCoupons, checkCouponIds, setCheckCouponIds } = useContext(OrderContext);

  const checkHandler = () => {
    if (isChecked) {
      setChecked(false);
      setCheckCoupons(checkCoupons.filter((el) => el.id !== coupon.id));
      setCheckCouponIds(checkCouponIds.filter((el) => el !== coupon.id));
    }
    else { // false 상태에서 클릭하면 true 로 변경
      const couponProduct = orderProductMap[coupon.productId];
      if (couponProduct.unitPrice*productQtyMap[coupon.productId] < coupon.minPrice) {
        alert("쿠폰 적용이 가능한 최소주문금액은 " + coupon.minPrice + "원 입니다.");
        return;
      }

      setChecked(true);
      checkCoupons[coupon.productId] = coupon;
      setCheckCouponIds([...checkCouponIds, coupon.id]);
    }
  }

  const getRateSpan = () => {
    return (
        <>
          <span>{coupon.rate}% 할인</span>
        </>
    )
  }

  const getFixSpan = () => {
    return (
        <>
          <span>{coupon.price}원 할인</span>
        </>
    )
  }

  const getMinPriceDiv = () => {
    return (
        <>
          <div className="col-12">
            최소주문금액 <span>{coupon.minPrice}</span>원
          </div>
        </>
    )
  }

  return (
      <>
        <div className="row" onClick={checkHandler}>
          <div className="col-12">
            {
              coupon.rate ? getRateSpan() : getFixSpan()
            }

          </div>
          <div className="col-12">
            <span>{coupon.name}</span>
          </div>
          {
            (!coupon.freeDelivery) ? getMinPriceDiv() : null
          }
        </div><br/><br/>
      </>
  )

}

export default CouponRow