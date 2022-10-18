/**
 * '장바구니' 결제 영역 페이지
 */

// Context
import { OrderContext } from "../../../context/orderProvider";


// Module
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import {AuthContext} from "../../../context/authProvider";
import {ServerConfigContext} from "../../../context/serverConfigProvider";


const Payment = () => {

	const { checkProducts } = useContext(OrderContext);
	const { url } = useContext(ServerConfigContext);
	const { headers } = useContext(AuthContext);

	const [sellerFixPolicy, setSellerFixPolicy] = useState({});
	const [totalPrice, setTotalPrice] = useState(999999999);
	const [discPrice, setDiscPrice] = useState(0);
	const [delPrice, setDelPrice] = useState(999999999);
	const [payPrice, setPayPrice] = useState(999999999);

	useEffect(() => {
		getFixDiscountPolicy();
		calcPaymentPrice();
	}, [checkProducts.length]);

	// 배송비 정책
	const getFixDiscountPolicy = async () => {

		const api = url + "/promotion-service/fix-discount/status";
		let productIds = [];
		let sellerIds = [];
		checkProducts.map((product) => {
			productIds.push(product.productId);
			sellerIds.push(product.sellerId);
		});

		const params = {
			productIdList: productIds.join(","),
			sellerIdList : sellerIds.join(",")
		}

		await axios.get(api, {params: params, headers: headers})
		.then((resp) => {
			console.log("[SUCCESS] (Payment) GET /promotion-service/fix-discount/status");

			const data = resp.data.result.data;
			console.log(data);

			setSellerFixPolicy(data);
		})
		.catch((err) => {
			console.log("[ERROR] (Payment) GET /promotion-service/fix-discount/status");
			console.log(err);
		});
	}


	const calcPaymentPrice = () => {
		// 상품 총 금액 계산
		let tPrice = 0;
		checkProducts.map((product) => tPrice += product.totalPrice);
		setTotalPrice(tPrice);

		// 총 할인금액 계산
		let discPrice = 0;
		checkProducts.map((product) => {
			if (product.discPrice !== 0) {
				discPrice +=  product.discPrice;
			}
		});
		setDiscPrice(discPrice);

		// 배송비 계산
		const sellers = [];
		checkProducts.map((product) => {
			if (!sellers.includes(product.sellerId)) {
				sellers.push(product.sellerId);
			}
		});

		let delPrice = 0;
		sellers.map((sellerId) => {
			if (!sellerFixPolicy[sellerId]) {
				delPrice += 3000;
			}
		});
		setDelPrice(delPrice);

		setPayPrice(tPrice-discPrice-delPrice);
	}

	return (
		<>
			<h3>결제예정금액</h3><br/>
			<table>
				<tbody>
					<tr>
						<td>상품금액</td>
						<td>{totalPrice}</td>
					</tr>
					<tr>
						<td>상품할인금액</td>
						<td>{discPrice}</td>
					</tr>
					<tr>
						<td>배송비</td>
						<td>{delPrice} 원</td>
					</tr>
				</tbody>
			</table>
			<hr/>
			<div>
				<span>{payPrice} 원</span>
			</div>
		</>
	)
}

export default Payment