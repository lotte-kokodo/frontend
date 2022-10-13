import { createContext, useState } from "react";

export const HttpHeadersContext = createContext();

function HttpHeadersProvider({ children }) {

	const [headers, setHeaders] = useState({
		"Authorization":`Bearer ${localStorage.getItem("accessToken")}`, // 새로고침하면 App Context 사라지기 때문에, 초기 값은 LocalStorage 값으로 세팅
		"memberId": 3
	});

	const value = {headers, setHeaders};

	return (
		<HttpHeadersContext.Provider value = {value}>
			{children}
		</HttpHeadersContext.Provider>
	);

}

export default HttpHeadersProvider;