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
import "./order.css"
import { HttpHeadersContext } from "../../Context/HttpHeadersProvider"


function OrderSheet() {

	const { auth, setAuth } = useContext(AuthContext);
	const memberId = auth;

	const { headers, setHeaders } = useContext(HttpHeadersContext);

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

	useEffect(() => {
		// getMemberInfo();
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
					<h3>결제정보</h3><hr />
					{/* <PaymentInfo orderProducts={orderProducts} productQtyMap={productQtyMap} /> */}
				</div>
			</div>
		</>
	);

}

export default OrderSheet