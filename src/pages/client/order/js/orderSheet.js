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
	const cartIds = state.cartIds ? state.cartIds : [];
	const productIds  = state.productIds;
	const productQtyMap = state.productQtyMap;

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