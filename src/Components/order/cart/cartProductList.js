/**
 * 장바구니 상품 리스트
 */

// Provider
import { ServerConfigContext } from "../../../context/serverConfigProvider"
import { AuthContext } from "../../../context/authProvider";
import { OrderContext } from "../../../context/OrderProvider";

// Module
import axios from "axios";
import { useContext, useEffect, useState } from "react"

// Component
import CartProductRow from "./cartProductRow";


const CartProductList = () => {

	const { url } = useContext(ServerConfigContext);
	const { headers, memberId } = useContext(AuthContext);
	const { checkProducts, setCheckProducts, checkProductIds, setCheckProductIds } = useContext(OrderContext);

	const api = url + "/order-payment-service/carts/" + memberId;

	const [products, setProducts] = useState([]);
	const [productIds, setProductIds] = useState([]);

	useEffect(() => {
		getCartProducts();
	}, []);

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
			})
			.catch((err) => {
				console.log("[error] (CartProductList) GET /order-payment-service/carts");
				console.log(err);
			});
	}

	/* '상품별' 체크박스 핸들러 */
	const checkCartHandler = (id, isChecked) => {
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
	const allCheckHandler = (isChecked) => {
		if (isChecked) {
			setCheckProductIds(productIds);
			setCheckProducts(products);
		}
		else {
			setCheckProductIds([]);
			setCheckProducts([]);
		}
	}

	return (
		<>
			<br/><br/><input type="checkbox" 
					onChange={(event) => allCheckHandler(event.target.checked)}
					checked={productIds.length === checkProductIds.length}
					/> &nbsp; &nbsp; 전체선택

			{
				products.map(function (product, idx) {
					return (
						<CartProductRow 
							product={product} key={idx}
							handler={checkCartHandler}
							checkCartCnt={checkProducts.length}
							allCartCnt={productIds.length}/>
					)
				})
			}
		</>
	);
}

export default CartProductList;