import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

	const [memberId, setMemberId] = useState(localStorage.getItem("memberId"));

	const value = {memberId, setMemberId};

	return (
		<AuthContext.Provider value = {value}>
			{children}
		</AuthContext.Provider>
	);

}

export default AuthProvider;