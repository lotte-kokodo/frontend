import {useContext, useEffect} from "react";
import {OrderContext} from "../../../context/orderProvider";

const FixDiscountPolicy = (props) => {

  const sellerId = props.sellerId;
  const { DELIVERY_PRICE, replaceNumberComma, fixDiscountPolicyMap } = useContext(OrderContext);

  useEffect(() => {
  }, [fixDiscountPolicyMap]);

  const discountDeliveryPrice = () => {
    return (
        <div className="row container-fluid">
          <span>배송비 0원 &nbsp;&nbsp;
            <i className="far fa-question-circle"></i> 판매자 배송비 할인정책 적용
          </span>
        </div>
    );
  }

  const deliveryPrice = () => {

    return (
        <div className="row container-fluid">
          <span>배송비 {replaceNumberComma(DELIVERY_PRICE)} 원</span>
        </div>
    )
  }

  return (
    <>
      {
        fixDiscountPolicyMap[sellerId] ? discountDeliveryPrice() : deliveryPrice()
      }
    </>
  );

}

export default FixDiscountPolicy;