/**
 * '주문고객정보' 컴포넌트 영역
 */

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider"


 function MemberInfo(props) {

	const memberInfo = props.memberInfo;
	console.log("MemberInfo")
	console.log(memberInfo);

	return (
		<>	
			<table className="table table-striped">
				<tbody>
					<tr>
						<th>받는 분</th>
						<td>
							<span>{memberInfo.name}</span>
						</td>
					</tr>

					<tr>
						<th>휴대폰</th>
						<td>
							<span>{memberInfo.phoneNumber}</span>
						</td>
					</tr>

					<tr>
						<th>이메일</th>
						<td>
							<span>{memberInfo.email}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);

 }

 export default MemberInfo;