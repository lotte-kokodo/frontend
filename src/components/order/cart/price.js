/**
 * '상품 가격' 컴포넌트
 */


const Price = (props) => {

	const product = props.product;
	const totalPrice = product.totalPrice;
	const discPrice = product.discPrice;

	const discProduct = () => {
		return (
				<>
					<del>{totalPrice}</del><br/><br/>
					<span>{totalPrice-discPrice}</span>
				</>
		);
	}

	const noDiscProduct = () => {
		return (
				<>
					<span>{totalPrice-discPrice}</span>
				</>
		);
	}

	return (
		<>
			{
				discPrice !== 0
				?
				discProduct()
				:
				noDiscProduct()
			}

		</>
	)

}

export default Price