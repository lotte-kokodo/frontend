
import { useContext, useState } from "react"
import { OrderContext } from "../../../context/orderProvider";

const CouponRow = (props) => {

  const coupon = props.coupon;
  const [ isChecked, setChecked ] = useState(false);
  const { checkCoupons, setCheckCoupons, checkCouponIds, setCheckCouponIds } = useContext(OrderContext);

  const checkHandler = () => {
    if (isChecked) {
      setChecked(false);
      setCheckCoupons(checkCoupons.filter((el) => el.id !== coupon.id));
      setCheckCouponIds(checkCouponIds.filter((el) => el !== coupon.id));
    }
    else { // false 상태에서 클릭하면 true 로 변경
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

  const print = () => {
    console.log(checkCoupons);
    console.log(checkCouponIds);
  }

  return (
      <>
        <button onClick={print}>버튼</button>
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