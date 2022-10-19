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
  const { checkRateCoupons, checkFixCoupons, orderProductMap } = useContext(OrderContext);

  const navigate = useNavigate();

  const orderSingleProduct = async () => {

    let api = url + "/order-payment-service/orders/" + memberId + "/single-product";

    const productId = productIds[0];
    const params = {
      productId: productId,
      sellerId: orderProductMap[productId].sellerId,
      qty: productQtyMap[productId],
      rateCouponId: checkRateCoupons[0],
      fixCouponId: checkFixCoupons[0]
    }

    await axios.post(api, null, { params: params, headers: headers })
    .then((resp) => {
      console.log("[SUCCESS] (PaymentButton) POST /order-payment-service/orders/single-product");
      console.log(resp.data.result.data);

      alert(resp.data.result.data.msg);
      navigate(`/`); // TODO 주문상세로 이동
    })
    .catch((err) => {
      console.log("[ERROR] (PaymentButton) POST /order-payment-service/orders/single-product");
      console.log(err);

    });

  }

  const orderCartProducts = async() => {
    let api = url + "/order-payment-service/orders/" + memberId + "/cart";

    const productSellerMap = {};
    productIds.map((productId) => {
      productSellerMap[productId] = orderProductMap[productId].sellerId;
    });

    const rateCouponIds = [];
    checkRateCoupons.map((coupon) => {
      rateCouponIds.push(coupon.id);
    });

    const fixCouponIds = [];
    checkFixCoupons.map((coupon) => {
      fixCouponIds.push(coupon.id);
    });

    const req = {
      cartIds: cartIds,
      productSellerMap: productSellerMap,
      rateCouponIds: rateCouponIds,
      fixCouponIds: fixCouponIds
    };

    await axios.post(api, req, {headers: headers})
    .then((resp) => {
      console.log("[SUCCESS] (PaymentButton) POST /order-payment-service/orders/cart");
      console.log(resp.data.result.data);

      alert(resp.data.result.data.msg);
      navigate(`/`); // TODO 주문상세로 이동
    })
    .catch((err) => {
      console.log("[ERROR] (PaymentButton) POST /order-payment-service/orders/cart");
      console.log(err);
    });
  }

  return (
      <>
        <br/>
        <div className="row">
            <button className="btn btn-danger btn-block"
                    onClick={cartIds.length !== 0 ? orderCartProducts : orderSingleProduct}>
              결제하기
            </button>
        </div>
      </>
  );
}

export default PaymentButton;