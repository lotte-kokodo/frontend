/**
 * '주문서' 컴포넌트 영역
 */

// Component
import Delivery from "../../../../components/order/ordersheet/delivery";
import OrderProductList from "../../../../components/order/ordersheet/orderProductList";
import PaymentButton from "../../../../components/order/ordersheet/paymentButton"


// Component
import CouponList from "../../../../components/order/ordersheet/couponList";
import Payment from "../../../../components/order/ordersheet/payment";
import {useLocation} from "react-router-dom";

function OrderSheet() {

	const state = useLocation().state;
	const cartIds = state && state.cartIds ? state.cartIds : [];
	const productIds  = state && state.productIds;
	const productQtyMap = state && state.productQtyMap;

	/**
	 * 회원 로그인 확인
	 * TODO 토큰 유효기간 확인 필요
	 * API GW 에 요청해서 확인
	 */
	const checkLogin = () => {

		if (!localStorage.getItem("accessToken")) {
			alert("로그인이 필요한 서비스입니다.");

		}

	}

	const notExistAuth = () => {
		return !localStorage.getItem("accessToken") && !localStorage.getItem("refreshToken")
	}

	/**
	 * 배송지, 전화번호 설정 확인
	 */
	const checkMemberStatus = () => {

	}

	return (
			<>
				{/*<OrderProvider>*/}
				<div className="order-container">
					<div className="row">
						<div className="col">
							<Delivery />
						</div>
					</div>
					<div className="row">
						<div className="col">
							<OrderProductList
									productIds={productIds}
									productQtyMap={productQtyMap}/>
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							<CouponList
									productIds={productIds}
									productQtyMap={productQtyMap}/>
						</div>
						<div className="col-3">
							<Payment
									productQtyMap={productQtyMap}/>
							<PaymentButton
									cartIds={cartIds}
									productIds={productIds}
									productQtyMap={productQtyMap}/>
						</div>
					</div>
				</div>
				{/*</OrderProvider>*/}
			</>
	);
}

export default OrderSheet