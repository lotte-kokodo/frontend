/**
 * 장바구니 상품 리스트
 */

// Provider
import { ServerConfigContext } from "../../../context/serverConfigProvider"
import { AuthContext } from "../../../context/authProvider";
import { OrderContext } from "../../../context/orderProvider";

// Module
import axios from "axios";
import { useContext, useEffect, useState } from "react"

// Component
import CartProductRow from "./cartProductRow";


const CartProductList = () => {

	const { url } = useContext(ServerConfigContext);
	const { headers, memberId } = useContext(AuthContext);
	const { checkProducts, setCheckProducts, checkProductIds, setCheckProductIds,
					setFixDiscountPolicy } = useContext(OrderContext);

	const api = url + "/order-payment-service/carts/" + memberId;

	const [products, setProducts] = useState([]);
	const [productIds, setProductIds] = useState([]);

	useEffect(() => {
		getCartProducts();
	}, []);

	useEffect(() => {
		getFixDiscountPolicy();
	}, [products.length]);

	const getCartProducts = async () => {
		// OrderService (Cart) 요청
		// 판매자 아이디 <SellerStore>
		// 장바구니 상품 리스트 <CartProductRow>
		axios.get(api, { headers: headers })
			.then((resp) => {
				console.log("[success] (CartProductList) GET /order-payment-service/carts");
				const data = resp.data.result.data;

				console.log(data);
				setProducts(data);
				setProductIds(data.map((product) => {return product.productId}));

				// 장바구니 접속 초기화면 = 전체선택
				// allCheckHandler(true);
			})
			.catch((err) => {
				console.log("[error] (CartProductList) GET /order-payment-service/carts");
				console.log(err);
			});
	}

	// 배송비 정책
	const getFixDiscountPolicy = async () => {

		const api = url + "/promotion-service/fix-discount/status";
		let productIds = [];
		let sellerIds = [];
		products.map((product) => {
			productIds.push(product.productId);
			sellerIds.push(product.sellerId);
		});

		const params = {
			productIdList: productIds.join(","),
			sellerIdList : sellerIds.join(",")
		}

		await axios.get(api, {params: params, headers: headers})
		.then((resp) => {
			console.log("[SUCCESS] (Payment) GET /promotion-service/fix-discount/status");

			const data = resp.data.result.data;
			console.log(data);

			setFixDiscountPolicy(data);
		})
		.catch((err) => {
			console.log("[ERROR] (Payment) GET /promotion-service/fix-discount/status");
			console.log(err);
		});
	}

	/* '상품별' 체크박스 핸들러 */
	const checkProductHandler = (id, isChecked) => {
		if (isChecked) {
			setCheckProductIds([...checkProductIds, id]);
			products.map((product) => {
				if (product.productId === id) {
					setCheckProducts([...checkProducts, product]);
				}
			});
		}
		else if (!isChecked && checkProductIds.includes(id)) {
			setCheckProductIds(checkProductIds.filter((el) => el !== id));
			setCheckProducts(checkProducts.filter((product) => product.productId !== id));
		}
	}

	/* '전체상품' 체크박스 핸들러 */
	const allProductCheckHandler = (isChecked) => {
		if (isChecked) {
			setCheckProductIds(productIds);
			setCheckProducts(products);
		}
		else {
			setCheckProductIds([]);
			setCheckProducts([]);
		}
	}

	const print = () => {
		console.log("cartProductList");
		console.log(checkProducts);
		console.log(checkProductIds);
	}

	return (
		<>
			<button className="btn btn-warn" onClick={print}>변수값 출력</button>
			<br/><br/><input type="checkbox" 
					onChange={(event) => allProductCheckHandler(event.target.checked)}
					checked={productIds.length === checkProductIds.length}
					/> &nbsp; &nbsp; 전체선택

			{
				products.map(function (product, idx) {
					return (
						<CartProductRow
							product={product} key={idx}
							handler={checkProductHandler}
							checkProductCnt={checkProducts.length}
							allProductCnt={productIds.length}/>
					)
				})
			}
		</>
	);
}

export default CartProductList;