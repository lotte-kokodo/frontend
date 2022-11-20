/**
 * 주문서 '결제하기 버튼' 컴포넌트
 * 주문 POST 요청
 */

import axios from "axios";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../../../context/authProvider";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {OrderContext} from "../../../context/orderProvider";

const PaymentButton = (props) => {

  const cartIds = props.cartIds;
  const productIds = props.productIds;
  const productQtyMap = props.productQtyMap;

  const { url } = useContext(ServerConfigContext);
  const { headers, memberId } = useContext(AuthContext);
  const { orderProductMap, checkRateCoupons, checkFixCoupons, setCheckRateCoupons, setCheckFixCoupons } = useContext(OrderContext);

  const navigate = useNavigate();

  const orderSingleProduct = async () => {

    let api = url + "/order-service/orders/singleProduct";

    const productId = productIds[0];
    const sellerId = orderProductMap[productId].sellerId;
    const req = {
      memberId: memberId,
      productId: productId,
      sellerId: sellerId,
      qty: productQtyMap[productId],
      rateCouponId: checkRateCoupons.length !== 0 ? checkRateCoupons[0].id : null,
      fixCouponId: checkFixCoupons.length !== 0 ? checkFixCoupons[0].id : null,
    }

    await axios.post(api, req, { headers: headers })
    .then((resp) => {
      clearCheckCoupons();
      alert(resp.data.result.data);
      navigate(`/`);
    })
    .catch((err) => {
      console.log(err);
      const errMessage = err.response.data.message;
      if (errMessage === "배송정보 미등록") {
        alert(errMessage);
        navigate("/mypageRead");
      }
    });

  }

  const orderCartProducts = async() => {
    let api = url + "/order-service/orders/cart";

    const rateCouponIds = [];
    checkRateCoupons.map((coupon) => {
      rateCouponIds.push(coupon.id);
    });

    const fixCouponIds = [];
    checkFixCoupons.map((coupon) => {
      fixCouponIds.push(coupon.id);
    });

    const req = {
      memberId: memberId,
      cartIds: cartIds,
      rateCouponIds: rateCouponIds,
      fixCouponIds: fixCouponIds
    };

    await axios.post(api, req, {headers: headers})
    .then((resp) => {
      clearCheckCoupons();
      alert(resp.data.result.data);
      navigate(`/`);
    })
    .catch((err) => {
      console.log(err);
      const errMessage = err.response.data.message;
      if (errMessage === "배송정보 미등록") {
        alert(errMessage);
        navigate("/mypageRead");
      }
    });
  }

  const clearCheckCoupons = () => {
    setCheckRateCoupons([]);
    setCheckFixCoupons([]);
  }

  return (
      <>
        <br/>
        <div  className="d-flex justify-content-end">
            <button className="btn btn-block order-btn"
                    onClick={cartIds.length !== 0 ? orderCartProducts : orderSingleProduct}>
              결제하기
            </button>
        </div>
      </>
  );
}

export default PaymentButton;