import { createContext, useState } from "react";

export const OrderContext = createContext();

/* 주문 관련 데이터를 제공하는 컨텍스트 */
const OrderProvider = ({ children }) => {

	// 체크박스로 선택한 장바구니
	const [checkCartMap, setCheckCartMap] = useState(new Map());

	// 선택한 비율할인쿠폰
	const [checkRateCouponMap, setCheckRateCouponMap] = useState({});

	// 선택한 고정할인쿠폰
	const [checkFixCouponMap, setCheckCouponMap] = useState({});

	// 비올할인정책
	const [rateDiscountPolicyMap, setRateDiscountPolicyMap] = useState({});

	// 고정할인정책
	const [fixDiscountPolicyMap, setFixDiscountPolicyMap] = useState({});

	// 장바구니에 담긴 상품들의 판매자 아이디 리스트
	const [sellerNameMap, setSellerNameMap] = useState([]);

	// 베송료
	const DELIVERY_PRICE = 3000;

	// 원 단위 표시
	const replaceNumberComma = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}

	const value = {
		checkCartMap, setCheckCartMap,
		checkRateCouponMap, setCheckRateCouponMap,
		checkFixCouponMap, setCheckCouponMap,
		rateDiscountPolicyMap, setRateDiscountPolicyMap,
		fixDiscountPolicyMap, setFixDiscountPolicyMap,
		sellerNameMap, setSellerNameMap,
		DELIVERY_PRICE, replaceNumberComma
	}

	return (
		<OrderContext.Provider value={value}>
			{children}
		</OrderContext.Provider>
	);

}

export default OrderProvider;