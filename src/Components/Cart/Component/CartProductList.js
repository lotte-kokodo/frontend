/**
 * 장바구니 상품 리스트
 */

// Provider
import { ServerConfigContext } from "../../../Context/ServerConfigProvider"
import { AuthContext } from "../../../Context/AuthProvider";
import { HttpHeadersContext } from "../../../Context/HttpHeadersProvider";

// Module
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import CartProductRow from "./CartProductRow";
import { CheckCartContext } from "../Context/CheckCartProvider";


const CartProductList = () => {

	const { url, setUrl } = useContext(ServerConfigContext);
	const { memberId, setMemberId } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	const { checkCarts, setCheckCarts } = useContext(CheckCartContext);

	const api = url + "/order-payment-service/carts/" + memberId;

	const [carts, setCarts] = useState([]);
	const [cartIds, setCartIds] = useState([]);

	const [checkCartIds, setCheckCartIds] = useState([]);
	const [isAllChecked, setIsAllChecked] = useState(false);

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
				if (checkCartIds.includes(cart.id)) {
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
			setIsAllChecked(true);

			setCheckCarts(carts);
		}
		else {
			setCheckCartIds([]);
			setIsAllChecked(false);

			setCheckCarts([]);
		}
	}

	return (
		<>
			<input type="checkbox" 
					onChange={(event) => allCheckHandler(event.target.checked)}
					checked={checkCartIds.length === cartIds.length ? true : false}
					/>

			{
				carts.map(function (cart, idx) {
					return (
						<CartProductRow 
							cart={cart} key={idx} 
							handler={checkCartHandler}
							isAllChecked={isAllChecked}/>
					)
				})
			}
		</>
	);
}

export default CartProductList;