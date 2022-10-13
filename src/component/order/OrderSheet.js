/**
 * '주문서' 페이지
 */

import MemberDelivery from "./MemberDelivery"
import OrderProductList from "./OrderProductList"
import Coupon from "./Coupon";
import Payment from "./Payment"

function OrderSheet() {


	return (
		<>
			<MemberDelivery /> {/* 배송정보 */}
			<OrderProductList /> {/* 주문상품정보 */}
			
			<div className="row">
				<div className="col-9">
					<Coupon />
				</div>
				<div className="col-3">
					<Payment />
				</div>
			</div>
		</>
	);
}

export default OrderSheet