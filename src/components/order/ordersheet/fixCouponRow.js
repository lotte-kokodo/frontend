
import { useContext, useState } from "react"
import { OrderContext } from "../../../context/orderProvider";

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
      setChecked(true);
      setCheckFixCoupons([...checkFixCoupons, coupon]);
    }
  }

  return (
      <>
        <div className="row" onClick={checkHandler}>
          <div className="col-12">
              <span>{coupon.price}원 할인</span>
          </div>
          <div className="col-12">
            <span>{coupon.name}</span>
          </div>
        </div><br/><br/>
      </>
  )

}

export default FixCouponRow