import {useContext, useEffect} from "react";
import {OrderContext} from "../../../context/orderProvider";

import "../../../pages/client/order/css/order.css"


const SellerName = (props) => {

  const sellerCartCnt = props.sellerCartCnt;
  const sellerId = props.sellerId;
  const sellerNameMap = props.sellerNameMap;
  // const { sellerNameMap } = useContext(OrderContext);

  // useEffect(() => {
  // }, [sellerNameMap.length]);


  return (
      <>
        <div className="row container-fluid seller-name-row-div">
            <span className="seller-name-span">{sellerNameMap[sellerId]} &nbsp; {sellerCartCnt} 건</span>
        </div>
      </>
  )

}

export default SellerName;