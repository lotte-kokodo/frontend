import { createContext, useState } from "react";

export const CheckCartContext = createContext();

/* 선택된 장바구니 상품들에 대한 정보를 제공하는 컨텍스트 */
const CheckCartProvider = ({ children }) => {

	const [checkCarts, setCheckCarts] = useState([]);
	const value = {checkCarts, setCheckCarts};

	return (
		<CheckCartContext.Provider value={value}>
			{children}
		</CheckCartContext.Provider>
	);

}

export default CheckCartProvider;