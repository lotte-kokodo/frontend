import { createContext, useState } from "react";

export const CheckCartContext = createContext();

/* 선택된 장바구니 상품들에 대한 정보를 제공하는 컨텍스트 */
const CheckCartProvider = ({ children }) => {

	const [checkCarts, setCheckCarts] = useState([]);
	const [checkCartIds, setCheckCartIds] = useState([]);
	const [rateDiscountPolicy, setRateDiscountPolicy] = useState({}); // { productId: rate }
	const [fixDiscountPolicy, setFixDiscountPolicy] = useState({}); // { sellerId: boolean } 무료배송정책 유무

	const value = {checkCarts, setCheckCarts, checkCartIds, setCheckCartIds,
								rateDiscountPolicy, setRateDiscountPolicy,
								fixDiscountPolicy, setFixDiscountPolicy};

	return (
		<CheckCartContext.Provider value={value}>
			{children}
		</CheckCartContext.Provider>
	);

}

export default CheckCartProvider;