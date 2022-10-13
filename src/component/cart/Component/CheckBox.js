/**
 * 체크박스
 */
import { useEffect, useState } from "react"


const CheckBox = (props) => {

	const cartId = props.cartId;

	const checkedCartHandler = props.handler;	

	const [cartChecked, setCartChecked] = useState(false);
	const checkHandler = (checked) => {
		setCartChecked(checked);		

		// '전체선택'이 적용된 상태에서 단일체크박스를 선택한 경우
		// isAllChecked 는 'true' 로 남아있는 상태
		// '전체선택' 이 체크가 안되있는 상태지만 사실상 isAllChecked == true 이기 때문에
		// '전체선택' 을 다시 체크해서 setIsAllChecked(true); 해도 true -> true 로 값이 변하지 않음
		// 따라서 allCheckHandler 핸들러 동작 X

		checkedCartHandler(cartId, checked);
	}
	const allCheckHandler = () => {
		// 단일체크박스 해제 후 배열 처리한 다음에 배열의 길이가 바뀐 다음
		// 배열 길이를 추적하기 때문에 다시 호출
		// 전체 배열 길이와 선택된 배열 길이가 다르다면 단일 선택
		if (props.allCartCnt === props.checkCartCnt) {
			setCartChecked(true);
		}
		else if (props.checkCartCnt != 0){
			setCartChecked(cartChecked);
		}
		else {
			setCartChecked(false);
		}
	}

	useEffect(() => allCheckHandler(), [props.checkCartCnt]);

	return (
		<>
			<input type="checkbox" 
					checked={cartChecked}
					onChange={ (event) => checkHandler(event.target.checked) }/>
		</>
	);
}

export default CheckBox