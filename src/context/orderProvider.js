import { createContext, useState } from "react";

export const OrderContext = createContext();

/* 주문 관련 데이터를 제공하는 컨텍스트 */
const OrderProvider = ({ children }) => {

	const [checkProducts, setCheckProducts] = useState([]);
	const [checkProductIds, setCheckProductIds] = useState([]);
	const [orderProducts, setOrderProducts] = useState([]);
	const [checkCouponIds, setCheckCouponIds] = useState([]);

	const value = {checkProducts, setCheckProducts,
								checkProductIds, setCheckProductIds,
								orderProducts, setOrderProducts,
								checkCouponIds, setCheckCouponIds};

	return (
		<OrderContext.Provider value={value}>
			{children}
		</OrderContext.Provider>
	);

}

export default OrderProvider;