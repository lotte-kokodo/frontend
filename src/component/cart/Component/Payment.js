/**
 * '장바구니' 결제 영역 페이지
 */

// Context
import { CheckCartContext } from "../context/CheckCartProvider";
import { HttpHeadersContext } from "../../../context/HttpHeadersProvider";


// Module
import { useContext, useEffect, useState } from "react"


const Payment = () => {

	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const { checkCarts, rateDiscountPolicy, fixDiscountPolicy } = useContext(CheckCartContext);

	const [ totalPrice, setTotalPrice ] = useState(999999);
	const [ discountPrice, setDiscountPrice ] = useState(0);
	const [ deliveryPrice, setDeliceryPrice ] = useState(999999);
	const [ paymentPrice, setPaymentPrice ] = useState(999999);


	useEffect(() => {
		calcPaymentPrice();
	}, [checkCarts.length]);


	const calcPaymentPrice = () => {
		// 상품 총 금액 계산
		let tPrice = 0;
		checkCarts.map((cart) => tPrice += cart.totalPrice);
		setTotalPrice(tPrice);

		// 총 할인금액 계산
		let discPrice = 0;
		checkCarts.map((cart) => {
			if (rateDiscountPolicy[cart.productId]) {
				discPrice += Math.floor(cart.totalPrice * (rateDiscountPolicy[cart.productId]*0.01));
				console.log(cart.totalPrice * (rateDiscountPolicy[cart.productId]*0.01));
			}
		});
		setDiscountPrice(discPrice);
		// TODO 배송비 계산
		// 중복되지 않는 판매자가 총 몇명? - 판매자 아이디 리스트
		// 배송 적용할 수 있는 판매자 아이디 리스트를 PromotionService 로 부터 받아 ?
		// 판매자 수 x 3000(배송비)
		
		// 배송비 추가 
		setPaymentPrice(tPrice-discPrice);
	}

	const print = () => {
		console.log(checkCarts);
		console.log(rateDiscountPolicy);
	}

	return (
		<>
		<div><button onClick={print}>버튼</button></div>
			<h5>결제예정금액</h5><br/>
			<table>
				<tbody>
					<tr>
						<td>상품금액</td>
						<td>{totalPrice}</td>
					</tr>
					<tr>
						<td>상품할인금액</td>
						<td>{discountPrice}</td>
					</tr>
					<tr>
						<td>배송비</td>
						<td>{}</td>
					</tr>
				</tbody>
			</table>
			<hr/>
			<div>
				<span>{paymentPrice} 원</span>
			</div>
		</>
	)
}

export default Payment