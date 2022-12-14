import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useState, useEffect} from "react";

import { ServerConfigContext } from "../../../context/serverConfigProvider";

export default function ProductTable(props) {
    const { url } = useContext(ServerConfigContext);
    const [discountPolicyName, setDiscountPolicyName] =useState(props.name);
    const [productList, setProductList] = useState([]);

    useEffect(() => {

        console.log(props.couponFlag);
        
        const fetchRateDiscountPolicyProduct = async () => {
            console.log(url + `/promotion-service/rate-discount/${discountPolicyName}/product`)
            await axios.get(url + `/promotion-service/rate-discount/${discountPolicyName}/product`)
                .then(function (resp) {
                    setProductList(resp.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        const fetchFixDiscountPolicyProduct = async () => {
            console.log(url + `/promotion-service/fix-discount/${discountPolicyName}/product`)
            await axios.get(url + `/promotion-service/fix-discount/${discountPolicyName}/product`)
                .then(function (resp) {
                    console.log(resp.data.result.data);
                    setProductList(resp.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        if(props.couponFlag) {
            fetchRateDiscountPolicyProduct();
        }
        else {
            fetchFixDiscountPolicyProduct();
        }

    }, []);



    return(
        <div style={{marginLeft: "30px"}} class="visible-scrollbar">

            <table className="product-table" style={{width:"95%", height:"90%"}}>
                <thead>
                    <tr>
                    <th>썸네일</th>
                    <th style={{width: "15%"}}>카테고리</th>
                    <th>상품명</th>
                    <th>노출상품명</th>
                    <th style={{width : "10%"}}>재고</th>
                    </tr>
                </thead>
                <tbody>
                {
                    productList.map( function(object, i){ 
                        return (
                        <tr>
                            <td><img src={object.thumbnail} className="coupon-product-image" /></td>
                            <td>{object.categoryId}</td>
                            <td>{object.name}</td>
                            <td>{object.displayName}</td>
                            <td>{object.stock}</td>
                        </tr>
                        )
                    })
                }
                </tbody>
                
            </table>


        </div>
    )
}