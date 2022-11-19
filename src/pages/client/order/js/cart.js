/**
 * '장바구니' 페이지
 */

// Component
import Delivery from "../../../../components/order/cart/delivery"
import Payment from "../../../../components/order/cart/payment"

// Provider
import OrderButton from "../../../../components/order/cart/orderButton";
import SellerList from "../../../../components/order/cart/sellerList";


const Cart = () => {

	return (
		<>
			<div className="order-page-title-container d-flex justify-content-center">
				<i className="fas fa-shopping-basket"></i> &nbsp;&nbsp;&nbsp;&nbsp;
				<span className="order-page-title-name-span">장바구니</span>
			</div>
				<div className="order-container">
					<div className="row">
						<div className="col-9">
							<Delivery /> {/* 배송정보 */}
							<br />
							<SellerList /> {/* 장바구니 상품 목록 */}
						</div>
						<div className="col-3">
							<Payment /> {/* 결제정보 */}
							<OrderButton />
						</div>
					</div>
				</div>
		</>
	);

}
export default Cart;