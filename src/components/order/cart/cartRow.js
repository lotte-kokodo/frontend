/**
 * 장바구니 상품 열
 */

// CSS
import "../../../pages/client/order/css/order.css"

// Component
import CheckBox from "./checkBox";
import Price from "./price";

// Module
import axios from "axios";
import {useContext, useState} from "react"

// Context
import {AuthContext} from "../../../context/authProvider";
import {OrderContext} from "../../../context/orderProvider";

const CartRow = (props) => {

	const { url, headers } = useContext(AuthContext);

	const cart = props.cart;
	const cartId = cart.cartId;
	const [qty, setQty] = useState(cart.qty);
	const { checkCarts, setCheckCarts } = useContext(OrderContext);

	const updateQty = async (updatedQty) => {

		const api = url + "/order-service/carts/" + cartId + "/qty";
		const req = {
			qty: updatedQty
		}

		await axios.post(api, req, {headers: headers })
			.then((resp) => {
				console.log("[Success](CartRow) updateQty().");
				console.log(resp);

				setQty(updatedQty);
				updateProductQty(updatedQty);
			})
			.catch((err) => {
				console.log("[Error](CartRow) updateQty().");
				console.log(err);

				const data = err.response.data;
				alert(data.message);
				setQty(data.result.qtyAvailable);
			});
	}

	const updateProductQty = (updatedQty) => {
		setCheckCarts(
				checkCarts.map((checkCart) =>
						checkCart.productId === cart.productId
							? {...checkCart, qty: updatedQty }
							: checkCart
				)
		)
	}

	const increaseQty = () => {
		const updatedQty = qty + 1;

		updateQty(updatedQty);
	}

	const decreaseQty = () => {
		const updatedQty = qty - 1;
		if (updatedQty <= 0) {
			return;
		}

		updateQty(updatedQty);
	}

	return (
		<>
			<div className="row container-fluid order-product-row-div">
				<div className="col-1">
					<CheckBox cartId={cart.cartId}
										cart={cart}
										handler={props.handler}
										checkCartCnt={props.checkCartCnt}
										sellerCartCnt={props.sellerCartCnt}/>
				</div>
				<div className="col-2">
					<img className="order-product-img" src={cart.productThumbnail} alt={cart.productName} />
				</div>
				<div className="col-4">
					<span>{cart.productName}</span>
				</div>
				<div className="col-2">
					<button onClick={decreaseQty}>-</button> &nbsp;
						<span>{qty}</span> &nbsp;
						<button onClick={increaseQty}>+</button> &nbsp;
					</div>
				<div className="col-3">
					<Price cart={cart} />
				</div>
			</div>
		</>
	);

}

export default CartRow;