/**
 * 장바구니 상품 열
 */

// CSS
import "../../pages/client/cart/css/cart.css"

// Component
import CheckBox from "./checkBox";
import Price from "./price";

// Module
import axios from "axios";
import { useContext, useState } from "react"

// Context
import { AuthContext } from "../../context/authProvider";


const CartProductRow = (props) => {

	const { headers } = useContext(AuthContext);

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

		await axios.patch(`http://localhost:8001/order-payment-service/carts/${cart.id}/qty`, req, {headers: headers })
			.then((resp) => {
				console.log("[Success](CartRow) updateQty().");
				console.log(resp);


				setQty(updatedQty);
			})
			.catch((err) => {
				console.log("[Error](CartRow) updateQty().");
				console.log(err);

				const data = err.response.data;
				alert(data.message);
				setQty(data.result.qtyAvailable);
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