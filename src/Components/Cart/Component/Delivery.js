/**
 * '배송지 정보' 컴포넌트
 */

// Provider
import { ServerConfigContext } from "../../../Context/ServerConfigProvider"
import { HttpHeadersContext } from "../../../Context/HttpHeadersProvider";

// Module
import axios from "axios";
import { useContext, useEffect, useState } from "react"

 const Delivery = () => {

	const { url, setUrl } = useContext(ServerConfigContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const api = url + "/member-service/member/deliveryInfo"

	const [ deliveryInfo, setDeliveryInfo ] = useState({});

	useEffect(() => {
		getDeliveryInfo();
	}, []);

	const getDeliveryInfo = async () => {

		await axios.get(api, {headers: headers})
		.then((resp) => {
			console.log("[success] (Delivery) GET /member/deliveryInfo");
			const data = resp.data.result.data;
	
			console.log(data);
			
			setDeliveryInfo(data);
		})
		.catch((err) => {
			console.log("[error] (Delivery) GET /member/deliveryInfo");
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
				<div className="col-3">
					베송지 설정 <i className="fas fa-chevron-right"></i>
				</div>
			</div>
		</>
	)
	
 }
 export default Delivery