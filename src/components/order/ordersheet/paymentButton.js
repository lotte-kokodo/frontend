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
  const { orderProductMap, checkRateCoupons, checkFixCoupons } = useContext(OrderContext);

  const navigate = useNavigate();

  const orderSingleProduct = async () => {

    let api = url + "/order-service/orders/singleProduct";

    const productId = productIds[0];
    const sellerId = orderProductMap[productId].sellerId;
    let productSellerMap = {};
    productSellerMap[productId] = sellerId;
    const req = {
      memberId: memberId,
      productId: productId,
      sellerId: sellerId,
      qty: productQtyMap[productId],
      rateCouponId: checkRateCoupons.length !== 0 ? checkRateCoupons[0].id : null,
      fixCouponId: checkFixCoupons.length !== 0 ? checkFixCoupons[0].id : null,
      productSellerMap: productSellerMap
    }

    await axios.post(api, req, { headers: headers })
    .then((resp) => {
      alert(resp.data.result.data.msg);
      navigate(`/`); // TODO 주문상세로 이동
    })
    .catch((err) => {
      console.log(err);

    });

  }

  const orderCartProducts = async() => {
    let api = url + "/order-service/orders/cart";

    const productSellerMap = {};
    Object.values(orderProductMap).map((product) => {
      productSellerMap[product.id] = product.sellerId;
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
      memberId: memberId,
      cartIds: cartIds,
      productSellerMap: productSellerMap,
      rateCouponIds: rateCouponIds,
      fixCouponIds: fixCouponIds
    };

    await axios.post(api, req, {headers: headers})
    .then((resp) => {
      alert(resp.data.result.data.msg);
      navigate(`/`); // TODO 주문상세로 이동
    })
    .catch((err) => {
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