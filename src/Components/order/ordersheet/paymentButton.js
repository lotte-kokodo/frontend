/**
 * 주문서 '결제하기 버튼' 컴포넌트
 * 주문 POST 요청
 */

import axios from "axios";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../../../context/authProvider";
import {ServerConfigContext} from "../../../context/serverConfigProvider";

const PaymentButton = (props) => {

  const cartIds = props.cartIds;
  const productIds = props.productIds;
  const productQtyMap = props.productQtyMap;

  const { url } = useContext(ServerConfigContext);
  const { headers, memberId } = useContext(AuthContext);

  const navigate = useNavigate();

  const orderSingleProduct = async () => {

    let api = url + "/order-payment-service/orders/" + memberId + "/single-product";

    const productId = productIds[0];
    const params = {
      productId: productId,
      qty: productQtyMap[productId],
      couponId: 1
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

    const req = {
      cartIds: cartIds,
      couponIds: [1, 2, 3] // TODO 주문 시 사용자가 선택한 쿠폰 아이디로 변경
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
                    onClick={cartIds ? orderCartProducts : orderSingleProduct}>
              결제하기
            </button>
        </div>
      </>
  );
}

export default PaymentButton;