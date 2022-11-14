/**
 * '장바구니' 결제 영역 페이지
 */

// Context
import {OrderContext} from "../../../context/orderProvider";

// Module
import {useContext, useEffect, useState} from "react"

const Payment = () => {

	const { cartMap, checkCartMap, fixDiscountPolicyMap, rateDiscountPolicyMap,
				replaceNumberComma, DELIVERY_PRICE } = useContext(OrderContext)

	const [totalPrice, setTotalPrice] = useState(999999999);
	const [discountPrice, setDiscountPrice] = useState(0);
	const [deliveryPrice, setDeliveryPrice] = useState(999999999);
	const [payPrice, setPayPrice] = useState(999999999);

	const sellerIds = [...checkCartMap.keys()];

	useEffect(() => {
		calcPaymentPrice();
	}, [checkCartMap, cartMap]);

	const calcPaymentPrice = () => {

		// 상품 총 금액 계산
		let tPrice = 0;
		sellerIds.map((sellerId) => {
			checkCartMap.get(sellerId).map((cart) => {
				tPrice += cart.unitPrice * cart.qty;
			})
		})
		setTotalPrice(tPrice);

		// 총 할인금액 계산
		let discPrice = 0;
		sellerIds.map((sellerId) => {
			checkCartMap.get(sellerId).map((cart) => {
				const rateDiscountPolicy = rateDiscountPolicyMap[cart.productId];
				if (rateDiscountPolicy) {
					discPrice +=  Math.floor((cart.unitPrice * cart.qty)*(0.01*rateDiscountPolicy.rate));
				}
			})
		})
		setDiscountPrice(discPrice);

		// 배송비 계산
		let delPrice = 0;
		sellerIds.map((sellerId) => {
			if (isSellersProductChecked(sellerId) && notAppliedFixDiscountPolicy(sellerId)) {
				delPrice += DELIVERY_PRICE;
			}
		})
		setDeliveryPrice(delPrice);

		setPayPrice(tPrice - discPrice + delPrice);
	}

	const isSellersProductChecked = (sellerId) => {
		return checkCartMap.get(sellerId) && checkCartMap.get(sellerId).length !== 0;
	}

	const notAppliedFixDiscountPolicy = (sellerId) => {
		return fixDiscountPolicyMap[sellerId] === false;
	}

	return (
		<>
			<h3>결제예정금액</h3><br/>
			<table>
				<tbody>
					<tr>
						<td>상품금액</td>
						<td>{replaceNumberComma(totalPrice)} 원</td>
					</tr>
					<tr>
						<td>상품할인금액</td>
						<td>{replaceNumberComma(discountPrice)} 원</td>
					</tr>
					<tr>
						<td>배송비</td>
						<td>{replaceNumberComma(deliveryPrice)} 원</td>
					</tr>
				</tbody>
			</table>
			<hr/>
			<div>
				<span>{replaceNumberComma(payPrice)} 원</span>
			</div>
		</>
	)
}

export default Payment