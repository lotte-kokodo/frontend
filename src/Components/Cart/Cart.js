/**
 * '장바구니' 컴포넌트 영역
 */

import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider"
import { HttpHeadersContext } from "../../Context/HttpHeadersProvider"

function Cart() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const memberId = auth;

	const [carts, setCarts] = useState([]);
	const [ cartTotalPrice, setCartTotalPrice ] = useState(0);

	const [cartIds, setCartIds] = useState([]);
	const [selectedCartIds, setSelectedCartIds] = useState([]);

	const selectAllProduct = (selected) => {
		console.log("[Cart.js] selectAllProduct");
		console.log(selected);

		if (selected) {
			setSelectedCartIds(cartIds);
		}
		else {
			setSelectedCartIds([]);
		}
	};

	const selectOneProduct = (selected, id) => {
		console.log("[Cart.js] selectAllProduct");
		console.log(selected);
		console.log(id);

		if (selected) {
			setSelectedCartIds([...selectedCartIds, id]);
		}
		else {
			setSelectedCartIds(selectedCartIds.filter((el) => el !== id));
		}
	}



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

			setCartIds(
				data.map(cart => { 
					return cart.id
				})
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
			{/* <div className="justify-content-start">
				<h5> 배송지 </h5>
			</div> */}
			<br/><br/>
			<div className="row">
				<div className="col-3">

				</div>
			</div>

			<div className="row">
				{/* 장바구니 상품 영역 */}
				<div className="col-9">
				&nbsp;
				<input className="form-check-input" type="checkbox"
						onChange={ (event) =>  selectAllProduct(event.target.checked) }
						checked={selectedCartIds.length === cartIds.length ? true : false}
						/> 
						&nbsp; &nbsp; 전체선택<hr />
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
					</div><br/><br/>
					<div className="d-flex justify-content-center">
						<button type="button" className="btn btn-danger">주문하기</button>
					</div>
				</div>
				
				
			</div>
			</>
		}
			
		</>
	);

	function CartRow(props) {
		const cart = props.cart;
		const idMap = {cartId: cart.id, productId: cart.productId};

		let [qty, setQty] = useState(cart.qty);

		function increaseQty() {
			qty = qty + 1;
			setQty(qty);
		}
		function decreaseQty() {
			qty = qty - 1;
			if (qty <= 0) {
				return;
			}
			setQty(qty);
		}
	
		return (
			<>
				<div className="row">
					<div className="col-1">
						<input className="form-check-input" type="checkbox" 
								onChange={ (event) => 
								selectOneProduct(event.target.checked, cart.id) } 
								checked={selectedCartIds.includes(cart.id) 
								|| selectedCartIds.length == cartIds.length 
								? true : false} />
					</div>
					<div className="col-2">
						<img className="order-product-img" src={cart.productThumbnail} alt={cart.name} />
					</div>
					<div className="col-4">
						<span>{cart.productName}</span>
					</div>
					<div className="col-2">
						<button onClick={decreaseQty}>-</button> &nbsp;
						<span>{cart.qty}</span> &nbsp;
						<button onClick={increaseQty}>+</button> &nbsp;
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