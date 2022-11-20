/**
 * '상품 가격' 컴포넌트
 */
import {useContext, useEffect} from "react";
import {OrderContext} from "../../../context/orderProvider";

const Price = (props) => {

	const cart = props.cart;
	const productId = cart.productId;
	const totalPrice = cart.qty * cart.unitPrice;

	const { rateDiscountPolicyMap, replaceNumberComma } = useContext(OrderContext);
	const discountRate = rateDiscountPolicyMap[productId] ? rateDiscountPolicyMap[productId].rate : undefined;

	const discProduct = () => {
		const discPrice = Math.floor(totalPrice*(1-0.01*discountRate));

		return (
				<>
					<del>{replaceNumberComma(totalPrice)} 원</del><br/><br/>
					<span>{replaceNumberComma(discPrice)}</span> 원 &nbsp;
					<i className="far fa-question-circle"></i> &npbs;
					<span>{discountRate} % 할인 적용</span>
				</>
		);
	}

	const noDiscProduct = () => {
		return (
				<>
					<span>{replaceNumberComma(totalPrice)}</span> 원
				</>
		);
	}

	return (
		<>
			{
				discountRate !== undefined
				?
				discProduct()
				:
				noDiscProduct()
			}

		</>
	)

}

export default Price