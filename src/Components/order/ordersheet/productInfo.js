/**
 * '주문서' 컴포넌트 영역
 */

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/authProvider"

function ProductInfo(props) {

	const { auth, setAuth } = useContext(AuthContext);

	const [ productInfo, setProductInfo ] = useState(props.productInfo);

	console.log(productInfo);

	return (
		<>
			{
				productInfo.map(function (productInfo, idx) {
					return ( 
						<ProductRow product={productInfo.product} qty={productInfo.qty} key={idx} />
					)
				})
			}

		</>
	);

}

function ProductRow(props) {
	const product = props.product;
	const qty = props.qty;

	return (
		<>
			<div className="row">
				<div className="col-2">
					<img className="order-product-img" src={product.thumbnail} alt={product.name} />
				</div>
				<div className="col-6">
					<span>{product.name}</span>
				</div>
				<div className="col-1">
					수량 <span>{qty}</span>
				</div>
				<div className="col-3">
					<span>{product.price*qty}</span> 원
				</div>
			</div>
		</>
	);
	
}

export default ProductInfo;