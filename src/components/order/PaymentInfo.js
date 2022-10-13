import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider"
import { Link } from "react-router-dom";



function PaymentInfo(props) {

	const productInfo = props.productInfo;

	const [totalPrice, setTotalPrice] = useState(-1);
	const [discountPrice, setDiscountPrice] = useState(-1);


	function calcTotalPrice() {
		setTotalPrice(
			productInfo.reduce((sum, info) => sum = sum + info.product.price * info.qty, 0)
		)
	}

	function calcDiscountPrice() {
		setDiscountPrice(0);
	}

	useEffect(() => {
		calcTotalPrice();
		calcDiscountPrice();
	}, [totalPrice, discountPrice]);


	return (
		<>
			<div>
				<h3>총 결제금액</h3><hr />
				<div className="row">
					<div className="col-4">총 상품금액</div>


					<div className="col-4">{totalPrice != 0 && totalPrice}</div>

				</div><br />
				<div className="row">
					<div className="col-4">배송비</div>
					<div className="col-4">{3000}</div>
				</div><br />
				<div className="row">
					<div className="col-4">할인금액</div>
					<div className="col-4">{ discountPrice != -1 && discountPrice}</div>
				</div><br /><br />
			</div>
		</>
	);

}

export default PaymentInfo;