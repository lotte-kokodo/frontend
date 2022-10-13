/**
 * 장바구니 상품 열
 */

// CSS
import "../css/cart.css"

// Component
import CheckBox from "./CheckBox";
import Price from "./Price";

// Module
import axios from "axios";
import { useContext, useState } from "react"

// Context
import { HttpHeadersContext } from "../../../context/HttpHeadersProvider";


const CartProductRow = (props) => {

	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const cart = props.cart;
	const [qty, setQty] = useState(cart.qty);
	const product = {
		productId: cart.productId,
		unitPrice: cart.unitPrice,
		qty: qty
	}

	const updateQty = async (updatedQty) => {

		const req = {
			qty: updatedQty
		}

		await axios.patch(`http://localhost:8001/order-payment-service/carts/${cart.id}/qty`, req, { headers: headers })
			.then((resp) => {
				console.log("[CartRow] increaseQty() success.");
				console.log(resp);


				setQty(updatedQty);
			})
			.catch((err) => {
				console.log(err);
			});

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
			<div className="row cart-product-row-div">
				<div className="col-1">
					<CheckBox cartId={cart.id} 
							handler={props.handler} 
							isAllChecked={props.isAllChecked} 
							checkCartCnt={props.checkCartCnt}
							allCartCnt={props.allCartCnt}/>
				</div>
				<div className="col-2">
					<img className="product-img" src={cart.productThumbnail} alt={cart.productName} />
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
					<Price product={product} />
				</div>
			</div>
		</>
	);

}

export default CartProductRow;