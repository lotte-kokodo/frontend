/**
 * '상품 가격' 컴포넌트
 */

// Provider
import { HttpHeadersContext } from "../../../Context/HttpHeadersProvider";
import { ServerConfigContext } from "../../../Context/ServerConfigProvider";

// Module
import axios from "axios";
import { useContext, useEffect, useState } from "react"


const Price = (props) => {

	const product = props.product;
	const productId = product.productId;
	const unitPrice = product.unitPrice;
	const qty = product.qty;

	const { url, setUrl } = useContext(ServerConfigContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const [ totalPrice, setTotalPrice ] = useState(unitPrice*qty);
	const [ discountPrice, setDiscountPrice ] = useState(0);

	const rateDiscountApi = url + "/promotion-service/rate-discount/" + productId;

	useEffect(() => {
		getRateDiscountPolicy();
	}, []);

	
	const calcDiscountPrice = (rate) => {
		return Math.floor(totalPrice*((100-rate)*0.01));
	}

	// PromotionService 요청
	// 비율할인정책(productId 당 정책)
	const getRateDiscountPolicy = async () => {

		await axios.get(rateDiscountApi, {headers: headers})
		.then((resp) => {
			console.log("[success] (Price) GET /promotion-service/rate-discount");
			const data = resp.data.result.data;

			console.log(data);
			if (data != null) {
				console.log(productId);
				setDiscountPrice(calcDiscountPrice(data.rate));
			}
		})
		.catch((err) => {
			console.log("[error] (Price) GET /promotion-service/rate-discount");
			console.log(err);
		});
	}

	// TODO
	// sellerIds, 고정할인정책(무료배송) 유무 true, false
	const getFixDiscountPolicy = async () => {

		await axios.get()
		.then((resp) => {
			console.log("[success] (Price) GET /promotion-service/...");
			const data = resp.data.result.data;
		})
		.catch((err) => {
			console.log("[error] (Price) GET /promotion-service/...");
			console.log(err);
		});

	}

	// 할인 정책 - 비율할인정책
	// 고정할인정책 = 판매자 스토어의 무료배송 정책
	// 고정할인정책이 하나라도 있으면 배송비 무료 
	// productId
	

	return (
		<>
			<del>{totalPrice}</del><br/><br/>
			<span>{discountPrice}</span>
		</>
	)

}

export default Price