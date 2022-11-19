
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
      if (couponProduct.price *productQtyMap[coupon.productId] < coupon.minPrice) {
        alert("쿠폰 적용이 가능한 최소주문금액은 " + coupon.minPrice + "원 입니다.");
        return;
      }
      for (let i=0; i<checkRateCoupons.length; i++) {
        let rateCoupon = checkRateCoupons[i];
        if (rateCoupon.productId === coupon.productId) {
          alert("상품 당 하나의 쿠폰만 적용가능합니다.");
          return;
        }
      }

      setChecked(true);
      setCheckRateCoupons([...checkRateCoupons, coupon]);
    }
  }

  return (
      <>
        {
          isChecked ?
              <div className="card check-coupon-card-div">
                <div className="row" onClick={checkHandler}>
                  <div className="col-1">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="col-10">
                    <span className="coupon-price-span">{coupon.rate}% 할인</span>
                  </div>
                  <div className="col-12">
                    <span>{coupon.name}</span>
                  </div>
                  <div className="col-12">
                    최소주문금액 <span>{coupon.minPrice}</span>원
                  </div>
                </div>
              </div>
              :

              <div className="card uncheck-coupon-card-div">
                <div className="row" onClick={checkHandler}>
                  <div className="col-12">
                    <span className="coupon-price-span">{coupon.rate}% 할인</span>
                  </div>
                  <div className="col-12">
                    <span className="coupon-name-span">{coupon.name}</span>
                  </div>
                  <div className="col-12">
                    최소주문금액 <span>{coupon.minPrice}</span>원
                  </div>
                </div>
              </div>

        }
      </>
  )

}

export default RateCouponRow