/**
 * 장바구니 상품 리스트
 */

// Provider
import { ServerConfigContext } from "../../context/serverConfigProvider"
import { AuthContext } from "../../context/authProvider";
import { CheckCartContext } from "../../context/checkCartProvider";

// Module
import axios from "axios";
import { useContext, useEffect, useState } from "react"

// Component
import CartProductRow from "./cartProductRow";


const CartProductList = () => {

	const { url } = useContext(ServerConfigContext);
	const { headers, memberId } = useContext(AuthContext);
	const { checkCarts, setCheckCarts, checkCartIds, setCheckCartIds } = useContext(CheckCartContext);

	const api = url + "/order-payment-service/carts/" + memberId;

	const [carts, setCarts] = useState([]);
	const [cartIds, setCartIds] = useState([]);

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
				setCarts(data);
				setCartIds(data.map((cart) => {return cart.id}));
			})
			.catch((err) => {
				console.log("[error] (CartProductList) GET /order-payment-service/carts");
				console.log(err);
			});
	}

	/* '상품별' 체크박스 핸들러 */
	const checkCartHandler = (id, isChecked) => {
		if (isChecked) {
			setCheckCartIds([...checkCartIds, id]);
			carts.map((cart) => {
				if (cart.id === id) {
					setCheckCarts([...checkCarts, cart]);
				}
			});
		}
		else if (!isChecked && checkCartIds.includes(id)) {
			setCheckCartIds(checkCartIds.filter((el) => el !== id));
			setCheckCarts(checkCarts.filter((cart) => cart.id !== id));
		}
	}

	/* '전체상품' 체크박스 핸들러 */
	const allCheckHandler = (isChecked) => {
		if (isChecked) {
			setCheckCartIds(cartIds);
			setCheckCarts(carts);
		}
		else {
			setCheckCartIds([]);
			setCheckCarts([]);
		}
	}

	return (
		<>
			<br/><br/><input type="checkbox" 
					onChange={(event) => allCheckHandler(event.target.checked)}
					checked={cartIds.length === checkCartIds.length}
					/> &nbsp; &nbsp; 전체선택

			{
				carts.map(function (cart, idx) {
					return (
						<CartProductRow 
							cart={cart} key={idx} 
							handler={checkCartHandler}
							checkCartCnt={checkCartIds.length} 
							allCartCnt={cartIds.length}/>
					)
				})
			}
		</>
	);
}

export default CartProductList;