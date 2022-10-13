/**
 * 체크박스
 */
import { useEffect, useState } from "react"


const CheckBox = (props) => {

	const checkedCartHandler = props.handler;
	const cartId = props.cartId;
	const isAllChecked = props.isAllChecked;

	const [cartChecked, setCartChecked] = useState(false);
	const checkHandler = (checked) => {
		setCartChecked(checked);
		checkedCartHandler(cartId, checked)
	}
	const allCheckHandler = () => {
		setCartChecked(isAllChecked);
	}

	useEffect(() => allCheckHandler(), [isAllChecked]);

	return (
		<>
			<input type="checkbox" 
					checked={cartChecked}
					onChange={ (event) => checkHandler(event.target.checked) }/>
		</>
	);
}

export default CheckBox