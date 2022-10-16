import { createContext, useState } from "react";

export const OrderContext = createContext();

/* 선택된 장바구니 상품들에 대한 정보를 제공하는 컨텍스트 */
const OrderProvider = ({ children }) => {

	const [checkProducts, setCheckProducts] = useState([]);
	const [checkProductIds, setCheckProductIds] = useState([]);
	const [rateDiscountPolicy, setRateDiscountPolicy] = useState({}); // { productId: rate }
	const [fixDiscountPolicy, setFixDiscountPolicy] = useState({}); // { sellerId: boolean } 무료배송정책 유무
	const [orderProducts, setOrderProducts] = useState([]);

	const value = {checkProducts: checkProducts, setCheckProducts: setCheckProducts, checkProductIds: checkProductIds, setCheckProductIds: setCheckProductIds,
								rateDiscountPolicy, setRateDiscountPolicy,
								fixDiscountPolicy, setFixDiscountPolicy,
								orderProducts, setOrderProducts};

	return (
		<OrderContext.Provider value={value}>
			{children}
		</OrderContext.Provider>
	);

}

export default OrderProvider;