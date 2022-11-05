/**
 * 체크박스
 */
import { useEffect, useState } from "react"


const CheckBox = (props) => {

	const cart = props.cart;
	const checkCartCnt = props.checkCartCnt;
	const sellerCartCnt = props.sellerCartCnt;

	const checkCartHandler = props.handler;

	const [isCartChecked, setCartChecked] = useState(false);
	const checkHandler = (checked) => {
		setCartChecked(checked);
		checkCartHandler(cart, checked);
	}
	const allCheckHandler = () => {
		if (sellerCartCnt === checkCartCnt) {
			setCartChecked(true);
		}
		else if (checkCartCnt !== 0){
			setCartChecked(isCartChecked);
		}
		else {
			setCartChecked(false);
		}
	}

	useEffect(() => allCheckHandler(), [props.checkCartCnt]);

	return (
		<>
			<input type="checkbox" 
					checked={isCartChecked}
					onChange={ (event) => checkHandler(event.target.checked) }/>
		</>
	);
}

export default CheckBox