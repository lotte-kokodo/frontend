import { useContext } from "react"
import { CheckCartContext } from "../Context/CheckCartProvider";


const Payment = () => {

	const { checkCarts, setCheckCarts } = useContext(CheckCartContext);



	return (
		<>
			<h5>결제예정금액</h5><br/>
			<table>
				<tbody>
					<tr>
						<td>상품금액</td>
						<td>{}</td>
					</tr>
					<tr>
						<td>상품할인금액</td>
						<td>{}</td>
					</tr>
					<tr>
						<td>배송비</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default Payment