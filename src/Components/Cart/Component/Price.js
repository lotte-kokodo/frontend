/**
 * '상품 가격' 컴포넌트
 */

const Price = (props) => {

	const product = props.product;
	const productId = product.id;
	const unitPrice = product.unitPrice;
	const qty = product.qty;

	// PromotionService 요청
	// 할인 정책 - 비율할인정책 
	// productId
	

	return (
		<>
			<del>{unitPrice * qty}</del><br/><br/>
			<span>{unitPrice * qty}</span>
		</>
	)

}

export default Price