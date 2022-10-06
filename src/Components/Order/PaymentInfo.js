import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider"


 function PaymentInfo(props) {

	const orderProducts = props.orderProducts;
	const productQtyMap = props.productQtyMap;

	const [totalPrice, setTotalPrice] = useState(0);
	const [discountPrice, setDiscountPrice] = useState(0);

	// TODO: 장바구니-상품 넘어갈 때(주문서 페이지로 넘어가는 경우) OrderSheet 컴포넌트로 갈 때.
	// productId(key)-qty(value) map 또는 dict 전달
	
	function calcTotalPrice() {

	}

	function calcDiscountPrice() {

	}

	useEffect(() => {
		calcTotalPrice();
		calcDiscountPrice();
	}, []);


	return (
		<>	
			<table className="table table-striped">
				<tbody>
					<tr>
						<th>주문금액</th>
						<th>
							<span>{  }</span>
						</th>
					</tr>

					<tr>
						<td>상품금액</td>
						<td>
							<span>{ }</span>
						</td>
					</tr>

					<tr>
						<td>상품할인금액</td>
						<td>
							<span>{ }</span>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);

 }

 export default PaymentInfo;