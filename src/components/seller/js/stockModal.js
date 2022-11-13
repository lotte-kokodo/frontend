import React from "react";
import { useContext } from "react";
import axios from "axios";
import { useState, useEffect} from "react";
import '../css/stockModal.css';

import {ServerConfigContext} from "../../../context/serverConfigProvider"
import {AuthContext} from "../../../context/authProvider"

export default function StockModal(props) {
    const { url } = useContext(ServerConfigContext);
    const { sellerHeaders } = useContext(AuthContext);
    const [stockModify,setStockModify] = useState(0);
    const params = {"id" : props.stcokUpdate.id, "stock" : stockModify};
    const onHandlerStockModify = (e) => {
        setStockModify(e.target.value);
    }


    const stockaxios = async () => {
        await axios({
            method: "post",
            url: url + `/seller-service/product/stock`,
            data : params,
            headers: sellerHeaders
        }) 
        .then(function(){
            props.stcokUpdate.stock = stockModify;
            props.onModalDisplay();
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return (
        <div className="stock-modal-container">
            <div className='stock-modal-header'>
                    <span className='stock-modal-title'>상품 재고 수정</span>
                    <button className='stock-modal-img' onClick={props.onModalDisplay} >X</button>
                    <hr />
            </div>

            <div className='stock-modal-body'>
                <div><img src={props.stcokUpdate.thumbnail} style={{width:"200px", height:"200px"}}/></div>
                <div className='product-name-price'>
                    <span className='stock-product-name'>상품 이름 : {props.stcokUpdate.displayName}</span>
                </div>
                <div className='stock-modal-body-middle'>
                    <span>현재 재고 : {props.stcokUpdate.stock} -&#x3e; </span>
                    <span>수정 재고 : <input type="number" className='stock-modify' value={stockModify} onChange={onHandlerStockModify} /></span>
                </div>
                <div>
                    <button className="product-search-button" onClick={stockaxios}>수정 완료</button>
                </div>
            </div>
        </div>
    )
}