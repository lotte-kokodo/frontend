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
import {ServerConfigContext} from "../../../context/serverConfigProvider";

const CartRow = (props) => {

	const { headers, memberId } = useContext(AuthContext);
	const { url } = useContext(ServerConfigContext);

	const cart = props.cart;
	const sellerId = props.sellerId;
	const [qty, setQty] = useState(cart.qty);
	const { checkCartMap, setCheckCartMap, cartMap } = useContext(OrderContext);

	const updateQty = async (updatedQty) => {

		const api = url + "/order-service/carts/qty";
		const req = {
			memberId: memberId,
			cartId: cart.cartId,
			qty: updatedQty
		}

		await axios.post(api, req, {headers: headers })
		.then((resp) => {
			setQty(updatedQty);
			updateProductQty(updatedQty);
		})
		.catch((err) => {
			const data = err.response.data;
			alert(data.message);
			setQty(data.result.qtyAvailable);
		});
	}

	const updateProductQty = (updatedQty) => {
		cartMap[sellerId].map((c) => {
			if (c.cartId === cart.cartId) {
				c.qty = updatedQty;
			}
		});

		[...checkCartMap.keys()].map((sellerId) => {
			setCheckCartMap((prev) => new Map(prev));
		})
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
					{
						cart.productId === -1 ?
								<div className="col">
								<span>
									<i className="fas fa-exclamation-circle"></i> &nbsp;
									해당 상품을 표시할 수 없습니다. 관리자에게 문의하세요.
								</span>
								</div>
								:
								<>
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
								</>
					}
				</div>
			</>
	);

}

export default CartRow;