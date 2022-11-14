/**
 * '배송지 정보' 컴포넌트
 */

// Provider
import { ServerConfigContext } from "../../../context/serverConfigProvider"
import { AuthContext } from "../../../context/authProvider";

// Module
import axios from "axios";
import { useContext, useEffect, useState } from "react"

 const Delivery = () => {

	const { url } = useContext(ServerConfigContext);
	const { headers } = useContext(AuthContext);

	const api = url + "/member-service/member/cart"

	const [ deliveryInfo, setDeliveryInfo ] = useState({});

	useEffect(() => {
		getDeliveryInfo();
	}, []);

	const getDeliveryInfo = async () => {

		await axios.get(api, {headers: headers})
		.then((resp) => {
			const data = resp.data.result.data;
			setDeliveryInfo(data);
		})
		.catch((err) => {
			console.log(err);
		});

	}

	return (
		<>
			<div className="row">
				<div className="col-3">
					<i className="fas fa-truck"></i> 배송지
				</div>
				<div className="col-6">
					{ deliveryInfo.address }
				</div>
				{/*<div className="col-3">*/}
				{/*	베송지 설정 <i className="fas fa-chevron-right"></i>*/}
				{/*</div>*/}
			</div>
		</>
	)
	
 }
 export default Delivery