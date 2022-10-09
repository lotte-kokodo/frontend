/**
 * '장바구니' 컴포넌트 영역
 */

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider"
import { HttpHeadersContext } from "../../Context/HttpHeadersProvider"

function Cart() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const memberId = auth;

	const [carts, setCarts] = useState([]);

	const [ cartTotalPrice, setCartTotalPrice ] = useState(0);


	// /* 장바구니 상품 정보 (order-service 로 요청) */
	const getCartProducts = async () => {

		await axios.get(`http://localhost:8001/order-payment-service/carts/${memberId}/`, {headers: headers})
		.then((resp) => {
			console.log("[Cart.js] getCartProducts() success.");
			console.log(resp);

			const data = resp.data.result.data
			setCarts(data);	
			setCartTotalPrice(
				data.reduce((sum, cart) => sum = sum + cart.totalPrice, 0)
			);

		})
		.catch((err) => {
			console.log("[Cart.js] getCartProducts() error.");
			console.log(err);
		})
	}


	useEffect(() => {
		getCartProducts();
	}, []);

	return (
		<>
		{
			carts && carts.length &&
			
			<>
			<div className="justify-content-start">
				<h5> 배송지 </h5>
			</div>
			<br/><br/>
			<div className="row">

				{/* 장바구니 상품 영역 */}
				<div className="col-9">
					<h3>장바구니</h3><hr />
					{
						carts && carts.length &&
						carts.map(function (cart, idx) {
							return (
								<CartRow cart={cart} key={idx} />
							)
						})
					}
				</div>

				{/* 결제 정보 영역 */}
				<div className="col-3">
					<h3>결제예정금액</h3><br/>
					<div>
						<div className="text-right"> 상품금액 &nbsp; <span>{cartTotalPrice}</span> 원 </div>
						<div className="text-right">할인할인금액 &nbsp; <span></span> 원 </div>
						<div className="text-right">배송비 &nbsp; <span>3000</span> 원 </div>
					</div>
				</div>
				
				
			</div>
			</>
		}
			
		</>
	);


	function CartRow(props) {
		const cart = props.cart;
	
		return (
			<>
				<div className="row">
					<div className="col-2">
						<img className="order-product-img" src={cart.productThumbnail} alt={cart.name} />
					</div>
					<div className="col-6">
						<span>{cart.productName}</span>
					</div>
					<div className="col-1">
						수량 <span>{cart.qty}</span>
					</div>
					<div className="col-3">
						{/* TODO: coupon NULL 처리 (할인 정책) */}
						<div className="row">
							<span>{cart.totalPrice}</span> 원
						</div>
						<div className="row">
							
						</div>
					</div>
				</div>
			</>
		);
		
	}

}

export default Cart