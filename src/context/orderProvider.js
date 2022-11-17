import { createContext, useState } from "react";

export const OrderContext = createContext();

/* 주문 관련 데이터를 제공하는 컨텍스트 */
const OrderProvider = ({ children }) => {

	// 장바구니 전체 리스트
	const [cartMap, setCartMap] = useState({});

	// 체크박스로 선택한 장바구니
	const [checkCartMap, setCheckCartMap] = useState(new Map());

	// 선택한 비율할인쿠폰
	const [checkRateCoupons, setCheckRateCoupons] = useState([]);

	// 선택한 고정할인쿠폰
	const [checkFixCoupons, setCheckFixCoupons] = useState([]);

	// 비올할인정책
	const [rateDiscountPolicyMap, setRateDiscountPolicyMap] = useState({});

	// 고정할인정책
	const [fixDiscountPolicyMap, setFixDiscountPolicyMap] = useState({});

	// 장바구니에 담긴 상품들의 판매자 아이디 리스트
	const [sellerNameMap, setSellerNameMap] = useState([]);

	// 주문서 상품 맵
	const [orderProductMap, setOrderProductMap] = useState([]);

	// 베송료
	const DELIVERY_PRICE = 3000;

	// 원 단위 표시
	const replaceNumberComma = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}

	const value = {
		cartMap, setCartMap,
		checkCartMap, setCheckCartMap,
		checkRateCoupons, setCheckRateCoupons,
		checkFixCoupons, setCheckFixCoupons,
		rateDiscountPolicyMap, setRateDiscountPolicyMap,
		fixDiscountPolicyMap, setFixDiscountPolicyMap,
		sellerNameMap, setSellerNameMap,
		orderProductMap, setOrderProductMap,
		DELIVERY_PRICE, replaceNumberComma
	}

	return (
		<OrderContext.Provider value={value}>
			{children}
		</OrderContext.Provider>
	);

}

export default OrderProvider;