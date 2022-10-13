import React, { useEffect, useState, useContext } from "react";

 function DeliveryInfo(props) {

	const deliveryAddr = props.deliveryAddr;

	const defaultInputPlaceHolder = "새로운 배송지명 입력";
	const defaultAddressName = "🏠 집";
	
	const [deliveryAddrName, setDeliveryAddressName] = useState(defaultAddressName);

	const [addressInputVal, setAddressInputVal] = useState(defaultInputPlaceHolder);
	const changeAddressInputVal = (event) => { setAddressInputVal(event.target.value); }


	function changeAddressName() {
		setDeliveryAddressName(addressInputVal);
		setAddressInputVal(defaultInputPlaceHolder)
	}

	return (
		<>	
			<table className="table table-striped">
				<tbody>
					<tr>
						<th>배송지명</th>
						<td>
							<span>{deliveryAddrName}</span><br/><br />
							<input placeholder="배송지명 수정" value={addressInputVal} onChange={changeAddressInputVal}></input>&nbsp;&nbsp; 
							<button onClick={changeAddressName}>수정하기</button>
						</td>
					</tr>

					<tr>
						<th>주소</th>
						<td>
							<span>{deliveryAddr}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);

 }

 export default DeliveryInfo;