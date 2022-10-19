
import { useContext, useState } from "react"
import { OrderContext } from "../../../context/orderProvider";

const RateCouponRow = (props) => {

  const coupon = props.coupon;
  const productQtyMap = props.productQtyMap;

  const [ isChecked, setChecked ] = useState(false);
  const { orderProductMap, checkRateCoupons, setCheckRateCoupons } = useContext(OrderContext);

  const checkHandler = () => {
    if (isChecked) {
      setChecked(false);
      setCheckRateCoupons(checkRateCoupons.filter((el) => el.id !== coupon.id));
    }
    else { // false 상태에서 클릭하면 true 로 변경
      const couponProduct = orderProductMap[coupon.productId];
      // TODO 상품 중복 적용 불가능 처리
      if (couponProduct.unitPrice*productQtyMap[coupon.productId] < coupon.minPrice) {
        alert("쿠폰 적용이 가능한 최소주문금액은 " + coupon.minPrice + "원 입니다.");
        return;
      }

      setChecked(true);
      setCheckRateCoupons([...checkRateCoupons, coupon]);
    }
  }

  return (
      <>
        <div className="row" onClick={checkHandler}>
          <div className="col-12">
            <span>{coupon.rate}% 할인</span>
          </div>
          <div className="col-12">
            <span>{coupon.name}</span>
          </div>
          <div className="col-12">
            최소주문금액 <span>{coupon.minPrice}</span>원
          </div>
        </div><br/><br/>
      </>
  )

}

export default RateCouponRow