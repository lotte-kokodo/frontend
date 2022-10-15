/**
 * '회원배송정보' 컴포넌트
 */

// Component
import {useContext, useEffect, useState} from "react"

// Provider
import { ServerConfigContext } from "../../../context/serverConfigProvider"
import { AuthContext } from "../../../context/authProvider";

// Module
import axios from "axios";


const Delivery = () => {
	const { url } = useContext(ServerConfigContext);
	const { headers } = useContext(AuthContext);

	const [member, setMember] = useState({});

	const api = url + "/member-service/member/orderInfo";

	useEffect(() => {
		getDeliveryInfo();
	}, []);

	const getDeliveryInfo = () => {
		axios.get(api, {headers: headers})
		.then((resp) => {
			console.log("[SUCCESS] (Delivery) GET /member-service/member/orderInfo");
			console.log(resp.data.result.data);

			setMember(resp.data.result.data);
		})
		.catch((err) => {
			console.log("[ERROR] (Delivery) GET /member-service/member/orderInfo");
			console.log(err);
		})
	}

	return (
			<>
				<h3>배송정보</h3><hr/>
					<table className="table table-striped">
						<tbody>
						<tr>
							<td>받는분</td>
							<td>{ member.name }</td>
						</tr>
						<tr>
							<td>배송지</td>
							<td>{ member.address }</td>
						</tr>
						<tr>
							<td>휴대전화번호</td>
							<td>{ member.phoneNumber }</td>
						</tr>
						<tr>
							<td>이메일</td>
							<td>{ member.email }</td>
						</tr>
						</tbody>
					</table>
			</>
	);
}

export default Delivery