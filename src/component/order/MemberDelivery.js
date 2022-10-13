/**
 * '회원배송정보' 컴포넌트
 */

// Provider
import { ServerConfigContext } from "../../context/ServerConfigProvider"
import { AuthContext } from "../../context/AuthProvider";
import { HttpHeadersContext } from "../../context/HttpHeadersProvider";

// Module
import axios from "axios";
import { useContext } from "react"

const MemberDelivery = () => {
	const { url, setUrl } = useContext(ServerConfigContext);
	const { memberId, setMemberId } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const api = url + 

	axios.get("")
	.then((resp) => {

	})
	.catch((err) => {
		
	})

	return (
		<>
			<h5>배송정보</h5>
			<hr/>
			<table>
				<tbody>
					<tr>
						<td>받는분</td>
						<td>{  }</td>
					</tr>
					<tr>
						<td>배송지</td>
						<td>{  }</td>
					</tr>
					<tr>
						<td>휴대전화번호</td>
						<td>{  }</td>
					</tr>
					<tr>
						<td>이메일</td>
						<td>{  }</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default MemberDelivery