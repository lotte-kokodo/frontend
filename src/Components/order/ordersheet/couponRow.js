
import { useContext, useState } from "react"
import { OrderContext } from "../../../context/orderProvider";

const CouponRow = (props) => {

  const coupon = props.coupon;
  const [ isChecked, setChecked ] = useState(false);
  const { checkCouponIds, setCheckCouponIds } = useContext(OrderContext);

  const checkHandler = () => {
    if (isChecked) {
      setChecked(false);
      setCheckCouponIds([...checkCouponIds, coupon.id]);
    }
    else {
      setChecked(true);
      setCheckCouponIds(checkCouponIds.filter((el) => el !== coupon.id));
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