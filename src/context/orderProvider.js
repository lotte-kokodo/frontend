import { createContext, useState } from "react";

export const OrderContext = createContext();

/* 주문 관련 데이터를 제공하는 컨텍스트 */
const OrderProvider = ({ children }) => {

	const [checkProducts, setCheckProducts] = useState([]);
	const [checkProductIds, setCheckProductIds] = useState([]);
	const [orderProductMap, setOrderProductMap] = useState([]);
	const [checkCoupons, setCheckCoupons] = useState([]);
	const [checkCouponIds, setCheckCouponIds] = useState([]);
	const [fixDiscountPolicy, setFixDiscountPolicy] = useState({});

	const value = {checkProducts, setCheckProducts,
								checkProductIds, setCheckProductIds,
								orderProductMap, setOrderProductMap,
								checkCoupons, setCheckCoupons,
								checkCouponIds, setCheckCouponIds,
								fixDiscountPolicy, setFixDiscountPolicy};

	return (
		<OrderContext.Provider value={value}>
			{children}
		</OrderContext.Provider>
	);

}

export default OrderProvider;