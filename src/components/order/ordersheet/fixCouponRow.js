import {useContext, useState} from "react"
import {OrderContext} from "../../../context/orderProvider";

const FixCouponRow = (props) => {

  const coupon = props.coupon;

  const [ isChecked, setChecked ] = useState(false);
  const { checkFixCoupons, setCheckFixCoupons } = useContext(OrderContext);

  const checkHandler = () => {
    if (isChecked) {
      setChecked(false);
      setCheckFixCoupons(checkFixCoupons.filter((el) => el.id !== coupon.id));
    }
    else { // false 상태에서 클릭하면 true 로 변경
      for (let i=0; i<checkFixCoupons.length; i++) {
        let fixCoupon = checkFixCoupons[i];
        if (fixCoupon.productId === coupon.productId) {
          alert("상품 당 하나의 쿠폰만 적용가능합니다.");
          return;
        }
      }

      setChecked(true);
      setCheckFixCoupons([...checkFixCoupons, coupon]);
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
                    <span className="coupon-price-span">{coupon.price}원 할인</span>
                  </div>
                  <div className="col-12">
                    <span className="coupon-name-span">{coupon.name}</span>
                  </div>
                </div><br/><br/>
              </div>
              :
              <div className="card uncheck-coupon-card-div">
                <div className="row" onClick={checkHandler}>
                  <div className="col-12">
                    <span className="coupon-price-span">{coupon.price}원 할인</span>
                  </div>
                  <div className="col-12">
                    <span className="coupon-name-span">{coupon.name}</span>
                  </div>
                </div><br/><br/>
              </div>
        }
      </>
  )

}

export default FixCouponRow