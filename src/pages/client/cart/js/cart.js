/**
 * '장바구니' 페이지
 */

// Component
import Delivery from "../../../../components/order/cart/delivery"
import CartProductList from "../../../../components/order/cart/cartProductList"
import Payment from "../../../../components/order/cart/payment"

// Provider
import OrderSheetButton from "../../../../components/order/cart/orderSheetButton";


const Cart = () => {

	return (
		<>
				<div className="order-container">
					<div className="row">
						<div className="col-9">
							<Delivery /> {/* 배송정보 */}
							<CartProductList /> {/* 장바구니 상품 목록 */}
						</div>
						<div className="col-3">
							<Payment /> {/* 결제정보 */}
							<OrderSheetButton />
						</div>
					</div>
				</div>
		</>
	);

}
export default Cart;