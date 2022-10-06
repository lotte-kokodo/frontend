/**
 * '주문서' 컴포넌트 영역
 */

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider"
import ProductInfo from "./ProductInfo";
import MemberInfo from "./MemberInfo";
import DeliveryInfo from "./DeliveryInfo";
import PaymentInfo from "./PaymentInfo";
import "./order.css"

function OrderSheet() {

	const { auth, setAuth } = useContext(AuthContext);
	const memberId = auth;

	const [array, setArray] = useState([]);
	const productQtyMap = new Map(array);
	const [productIds, setProductIds] = useState([1, 3, 5, 7]);

	const [memberInfo, setMemberInfo] = useState({});
	const [productInfo, setProductInfo] = useState({});	

	// /* 주문 상품 정보 (product-service 로 요청) */
	const getOrderProducts = async () => {
		await axios.get(`http://localhost:9270/product/orderProducts`, {params: {productIds: productIds.join(",")}})
		.then((resp) => {
			console.log("[OrderMemberInfo.js] getOrderProducts() success.");
			console.log(resp);

			setProductInfo(resp.data.result.data);

		})
		.catch((err) => {
			console.log("[OrderMemberInfo.js] getOrderProducts() error.");
			console.log(err);
		})
	}

	/* 주문 사용자 정보 (member-service 로 요청) */
	const getMemberInfo = async () => {

		// await axios.get(`http://localhost:8080/member/${memberId}/orderInfo`)
		await axios.get(`http://localhost:8080/member/1/orderInfo`)
			.then((resp) => {
				console.log("[OrderMemberInfo.js] getMemberInfo() success.");
				console.log(resp);

				setMemberInfo(resp.data.result.data);
			})
			.catch((err) => {
				console.log("[OrderMemberInfo.js] getMemberInfo() error.");
				console.log(err);

			});

	}

	/* 쿠폰 정보 (coupon-service 로 요청) */
	/* memberId, productId 상품 개수만큼 요청, fix-rate coupon 각각 */
	const getCouponInfo = async () => {

		// await axios.get(`http://localhost:8080/`)
		// .then((resp) => {
		// 	console.log("[OrderMemberInfo.js] getMemberInfo() success.");
		// 	console.log(resp.data);

		// 	setOrderMemberInfo(resp.data.data);
		// })
		// .catch((err) => {
		// 	console.log("[OrderMemberInfo.js] getMemberInfo() error.");
		// 	console.log(err);

		// });

	}

	useEffect(() => {
		getMemberInfo();
		getOrderProducts();
	}, []);


	return (
		<>
			<div>
				<h3>상품정보</h3><hr />
				{
					productInfo && productInfo.length &&
					<ProductInfo productInfo={productInfo} productQtyMap={productQtyMap}/>
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
					<MemberInfo memberInfo={memberInfo}/>
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