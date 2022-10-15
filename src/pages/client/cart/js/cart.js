/**
 * '장바구니' 페이지
 */

// Component
import Delivery from "../../../../components/cart/delivery"
import CartProductList from "../../../../components/cart/cartProductList"
import Payment from "../../../../components/cart/payment"

// Provider
import CheckCartProvider from "../../../../context/checkCartProvider";
import OrderSheetButton from "../../../../components/cart/orderSheetButton";


const Cart = () => {

	return (
		<>
			{/*<CheckCartProvider>*/}
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
			{/*</CheckCartProvider>*/}
		</>
	);

}
export default Cart;