import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";
import {OrderContext} from "../../../context/orderProvider";

import axios from "axios";
import { useContext, useEffect, useState } from "react"
import SellerName from "./sellerName";
import CartList from "./cartList";
import FixDiscountPolicy from "./FixDiscountPolicy";

import "../../../pages/client/order/css/order.css"

const SellerList = () => {

  const { url } = useContext(ServerConfigContext);
  const { headers } = useContext(AuthContext);
  const { cartMap, setCartMap, checkCartMap, setCheckCartMap, setFixDiscountPolicyMap, setRateDiscountPolicyMap, setSellerNameMap, fixDiscountPolicy, sellerNameMap } = useContext(OrderContext);

  const api = url + "/order-service/carts";

  const [sellerIds, setSellerIds] = useState([]);
  const [carts, setCarts] = useState([]);
  const [cartProductIds, setCartProductIds] = useState([]);

  useEffect(() => {
    getCarts();
  }, []);

  useEffect(() => {
      getRateDiscountPolicy();
      getFixDiscountPolicy();
      getSellerNames();
  }, [cartMap]);

  const getCarts = async () => {
    // OrderService (Cart) 요청
    axios.get(api, { headers: headers })
    .then((resp) => {
      const data = resp.data.result.data;
      setCartMap(data);

      setSellerIds(Object.keys(data));
      Object.keys(data).map((sellerId) => {
        data[sellerId].map((cart) => {
          setCartProductIds((prev) => [...prev, cart.productId]);
          setCarts((prev) => [...prev, cart]);
          setCheckCartMap((prev) => new Map(prev).set(sellerId, []));
        })

      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // 비율할인 정책
  const getRateDiscountPolicy = async () => {

    const api = url + "/promotion-service/rate-discount/list";
    const params = {
      productIdList: cartProductIds.join(",")
    }

    await axios.get(api, {params: params, headers: headers})
    .then((resp) => {

      const data = resp.data.result.data;
      setRateDiscountPolicyMap(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // 고정할인(배송비) 정책
  const getFixDiscountPolicy = async () => {

    const api = url + "/promotion-service/fix-discount/status";

    let productIdList = [];
    let sellerIdList = [];
    sellerIds.map((sellerId) => {
      cartMap[sellerId].map((cart) => {
        productIdList.push(cart.productId);
        sellerIdList.push(cart.sellerId);
      });
    });

    const params = {
      productIdList: productIdList.join(","),
      sellerIdList : sellerIdList.join(",")
    }

    await axios.get(api, {params: params, headers: headers})
    .then((resp) => {
      const data = resp.data.result.data;
      setFixDiscountPolicyMap(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getSellerNames = async () => {
    const api = url + "/seller-service/seller/names";
    const params = {
      sellerIds: sellerIds.join(",")
    }

    await axios.get(api, {params: params, headers: headers})
    .then((resp) => {
      const data = resp.data.result.data;
      setSellerNameMap(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const deleteCart = async () => {
    const api = url + "/order-service/carts";
    let deleteCartIds = [];
    [...checkCartMap.keys()].map((sellerId) => {
      checkCartMap.get(sellerId).map((cart) => {
        deleteCartIds.push(cart.cartId);
      })
    });

    console.log(deleteCartIds);
    const params = {
      cartIds: deleteCartIds.join(",")
    }

    await axios.delete(api, {params: params, headers: headers})
    .then((resp) => {
      // 선택된 장바구니 리스트에서 삭제
      [...checkCartMap.keys()].map((sellerId) => {
        let checkCarts = checkCartMap.get(sellerId).filter((checkCart) => !deleteCartIds.includes(checkCart.cartId));
        setCheckCartMap((prev) => new Map(prev).set(sellerId, checkCarts));
      })

      const data = resp.data.result.data;
      alert(data);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  /* '전체상품' 체크박스 핸들러 */
  const allSellerCheckHandler = (isChecked) => {
    if (isChecked) {
      sellerIds.map((sellerId) => {
        setCheckCartMap((prev) => new Map(prev).set(sellerId, cartMap[sellerId]));
      })
    }
    else {
      sellerIds.map((sellerId) => {
        setCheckCartMap((prev) => new Map(prev).set(sellerId, []));
      })
    }
  }

  const isAllCartChecked = () => {
    let checkCartCnt = 0;
    sellerIds.map((sellerId) => {
      checkCartCnt = checkCartCnt + checkCartMap.get(sellerId).length;
    })
    return carts.length === checkCartCnt;
  }

  return (
      <>
        <div className="row justify-content-between">
          <div className="col-4">
          <input type="checkbox"
                 onChange={(event) => allSellerCheckHandler(event.target.checked)}
                 checked={isAllCartChecked()}/> &nbsp; &nbsp; 전체선택
          </div>
          <div className="col-6"/>
          <div className="col-2">
            <button className="btn order-btn" onClick={deleteCart}>
              <i className="fas fa-trash-alt"></i> &nbsp;
              삭제
            </button>
          </div>
        </div>
        {
          sellerIds.map((sellerId, idx) => {
            let sellerCarts = cartMap[sellerId];

            return (
                <div className="row container-fluid seller-list-div">
                  <SellerName sellerId={sellerId} sellerCartCnt={sellerCarts.length} sellerNameMap={sellerNameMap} />
                  <CartList carts={sellerCarts} sellerId={sellerId}/>
                  <FixDiscountPolicy sellerId={sellerId}/>
                </div>
                );
          })
        }
      </>
  );

}

export default SellerList;