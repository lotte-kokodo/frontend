import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

	/* Http Header 정보 */
	const [headers, setHeaders] = useState({
		"Authorization":`Bearer ${localStorage.getItem("accessToken")}`, // 새로고침하면 App Context 사라지기 때문에, 초기 값은 LocalStorage 값으로 세팅
		"memberId": 3
	});

	// 회원 아이디 정보
	const [memberId, setMemberId] = useState(localStorage.getItem("memberId"));

	const value = {headers, setHeaders, memberId, setMemberId};

	return (
		<AuthContext.Provider value = {value}>
			{children}
		</AuthContext.Provider>
	);

}

export default AuthProvider;