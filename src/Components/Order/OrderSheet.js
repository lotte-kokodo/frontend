/**
 * '주문서' 컴포넌트 영역
 */

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider"
import { useLocation, useNavigate } from "react-router-dom";

import ProductInfo from "./ProductInfo";
import MemberInfo from "./MemberInfo";
import DeliveryInfo from "./DeliveryInfo";
import PaymentInfo from "./PaymentInfo";
import "./order.css"
import { HttpHeadersContext } from "../../Context/HttpHeadersProvider"
import { Link } from "react-router-dom";



function OrderSheet() {

	const { auth, setAuth } = useContext(AuthContext);
	const memberId = auth;
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const state = useLocation().state;
	const cartIds = state.selectedCartIds;
	const productIdQtyList = state.selectedProductIdQtyList;
	const productIds = state.selectedProductIds;

	let [memberInfo, setMemberInfo] = useState({});
	let [productInfo, setProductInfo] = useState([]);


	// /* 주문 상품 정보 (product-service 로 요청) */
	const getOrderProducts = async () => {

		await axios.get(`http://localhost:8001/order-payment-service/orders/${memberId}/orderSheet`, { params: { productIds: productIds.join(",") }, headers: headers })
			.then((resp) => {
				console.log("[OrderSheet.js] getOrderProducts() success.");
				console.log(resp);

				const data = resp.data.result.data;

				setProductInfo(
					data.productInfos.map((product) => {
						const qty = productIdQtyList.filter((el) => el.productId == product.id)[0].qty

						// QTY 추가
						return {
							product: product,
							qty: qty
						}
					})
				);

				setMemberInfo(data.memberInfo);

			})
			.catch((err) => {
				console.log("[OrderSheet.js] getOrderProducts() error.");
				console.log(err);
			})
	}

	const orderSingleProduct = async () => {
		
		let url = "http://localhost:8001/order-payment-service/orders/" + memberId + "/single-product";

		const params = {
			productId: productInfo[0].product.id,
			qty: productInfo[0].qty,
			couponId: 1
		}

		await axios.post(url, null, { params: params, headers: headers })
		.then((resp) => {
			console.log("[OrderSheet.js] orderSingleProduct() success.");
			console.log(resp.data.result.data);

			alert(resp.data.result.data.msg);
			navigate(`/`); // TODO 주문상세로 이동
		})
		.catch((err) => {
			console.log("[OrderSheet.js] orderSingleProduct() error.");
			console.log(err);

		});

	}

	const orderCartProducts = async() => {
		let url = "http://localhost:8001/order-payment-service/orders/" + memberId + "/cart";

		const req = {
				cartIds: cartIds,
				couponIds: [1, 2, 3]
			};

		await axios.post(url, req, {headers: headers})
		.then((resp) => {
			console.log("[OrderSheet.js] orderCartProducts() success.");
			console.log(resp.data.result.data);

					alert(resp.data.result.data.msg);
			navigate(`/`); // TODO 주문상세로 이동
		})
		.catch((err) => {
			console.log("[OrderSheet.js] orderCartProducts() error.");
			console.log(err);

		});
	}

	useEffect(() => {
		getOrderProducts();
	}, []);


	return (
		<>
			<div>
				<h3>상품정보</h3><hr />
				{
					productInfo && productInfo.length &&
					<ProductInfo productInfo={productInfo} />
				}

			</div>

			<div>
				<h3>적용 가능한 쿠폰</h3><hr />
			</div>

			<div>
				<h3>배송정보</h3><hr />


				<DeliveryInfo deliveryAddr={memberInfo.address} />

			</div>

			<div className="row">
				<div className="col">
					<h3>주문자 정보</h3><hr />

					<MemberInfo memberInfo={memberInfo} />

				</div>
				<div className="col">
					
					<PaymentInfo productInfo={productInfo} />
					<div className="row justify-content-center">
						<button className="col-8 btn btn-danger"
							onClick={cartIds ? orderCartProducts : orderSingleProduct}>
							주문하기
						</button>
					</div>
				</div>
			</div>
		</>
	);

}

export default OrderSheet