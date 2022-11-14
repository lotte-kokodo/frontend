/**
 * 장바구니 상품 리스트
 */

import { OrderContext } from "../../../context/orderProvider";
import { useContext } from "react"
import CartRow from "./cartRow";


const CartList = (props) => {

	const { checkCartMap, setCheckCartMap } = useContext(OrderContext);

	let carts = props.carts;
	let sellerId = props.sellerId;

	/* '상품별' 체크박스 핸들러 */
	const cartCheckHandler = (cart, isChecked) => {
		if (isChecked) {
			checkCartMap.get(sellerId).push(cart);
			let checkCarts = checkCartMap.get(sellerId);
			setCheckCartMap((prev) => new Map([...prev, [sellerId, checkCarts]]));
		}
		else if (!isChecked && isIncludeCheckCarts(cart)) {
			[...checkCartMap.keys()].map((sellerId) => {
				let checkCarts = checkCartMap.get(sellerId).filter((checkCart) => checkCart.cartId !== cart.cartId);
				setCheckCartMap((prev) => new Map(prev).set(sellerId, checkCarts));
			})
		}
	}

	const isIncludeCheckCarts = (cart) => {
		let sellerIds = checkCartMap.keys();

		for (let i=0; i<sellerIds.length; i++) {
			let sellerId = sellerIds[i];
			let checkCarts = checkCartMap.get(sellerId);
			for (let j=0; j<checkCarts.length; j++) {
				if (checkCarts[i].cartId === cart.cartId) {
					return true;
				}
			}
		}
		return true;
	}

	/* '전체상품' 체크박스 핸들러 */
	const allCartCheckHandler = (isChecked) => {
		if (isChecked) {
			setCheckCartMap((prev) => new Map(prev).set(sellerId, carts));
		}
		else {
			setCheckCartMap((prev) => new Map(prev).set(sellerId, []));

		}
	}

	return (
		<>
			<div className="row container-fluid">
				<input type="checkbox"
						onChange={(event) => allCartCheckHandler(event.target.checked)}
						checked={carts.length === (checkCartMap.get(sellerId) !== undefined && checkCartMap.get(sellerId).length)}/> &nbsp; &nbsp; 전체선택
			</div>
			{
				carts.map(function (cart, idx) {
					return (
						<CartRow
							cart={cart} sellerId={sellerId} key={idx}
							handler={cartCheckHandler}
							checkCartCnt={checkCartMap.get(sellerId).length}
							sellerCartCnt={carts.length}/>
					)
				})
			}
		</>
	);
}

export default CartList;