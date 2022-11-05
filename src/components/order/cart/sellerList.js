import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";
import {OrderContext} from "../../../context/orderProvider";

import axios from "axios";
import { useContext, useEffect, useState } from "react"
import SellerName from "./sellerName";
import CartList from "./cartList";
import FixDiscountPolicy from "./FixDiscountPolicy";

const SellerList = () => {

  const { url } = useContext(ServerConfigContext);
  const { headers } = useContext(AuthContext);
  const { checkCartMap, setCheckCartMap, setFixDiscountPolicyMap, setRateDiscountPolicyMap, setSellerNameMap } = useContext(OrderContext);

  const api = url + "/order-service/carts";

  const [cartMap, setCartMap] = useState([]);
  const [sellerIds, setSellerIds] = useState([]);
  const [carts, setCarts] = useState([]);
  const [cartProductIds, setCartProductIds] = useState([]);

  let a = [];
  let b = [];

  useEffect(() => {
    getCarts();
  }, []);

  useEffect(() => {
    getRateDiscountPolicy();
    getFixDiscountPolicy();
    getSellerNames();

    console.log(cartMap);
    console.log(checkCartMap);
    console.log(carts.length);
    console.log(carts);
    console.log(cartProductIds);
    console.log(sellerIds);
    console.log("temp a b");
    console.log(a);
    console.log(b);
  }, [cartMap.length]);

  const getCarts = async () => {
    // OrderService (Cart) 요청
    axios.get(api, { headers: headers })
    .then((resp) => {
      console.log("[success] (CartList) GET /order-service/carts");
      const data = resp.data.result.data;
      console.log(data); // 판매자아이디-상품리스트

      setCartMap(data);

      setSellerIds(Object.keys(data));
      Object.keys(data).map((sellerId) => {
        data[sellerId].map((cart) => {
          console.log("Cart");
          console.log(cart);
          setCartProductIds((prev) => [...prev, cart.productId]);
          setCarts((prev) => [...prev, cart]);
          setCheckCartMap((prev) => new Map(prev).set(sellerId, []));
        })

      })
    })
    .catch((err) => {
      console.log("[error] (CartList) GET /order-service/carts");
      console.log(err);
    });
  }

  // 바율할인 정책
  const getRateDiscountPolicy = async () => {

    const api = url + "/promotion-service/rate-discount/list";
    const params = {
      productIdList: cartProductIds.join(",")
    }

    await axios.get(api, {params: params, headers: headers})
    .then((resp) => {
      console.log("[SUCCESS] (Payment) GET /promotion-service/rate-discount/list");

      const data = resp.data.result.data;
      console.log(data);

      setRateDiscountPolicyMap(data);
    })
    .catch((err) => {
      console.log("[ERROR] (Payment) GET /promotion-service/rate-discount/list");
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
      console.log("[SUCCESS] (Payment) GET /promotion-service/fix-discount/status");

      const data = resp.data.result.data;
      console.log(data);

      setFixDiscountPolicyMap(data);
    })
    .catch((err) => {
      console.log("[ERROR] (Payment) GET /promotion-service/fix-discount/status");
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
      console.log("[SUCCESS] (Payment) GET /seller-service/seller/names");

      const data = resp.data.result.data;
      console.log(data);

      setSellerNameMap(data);
    })
    .catch((err) => {
      console.log("[ERROR] (Payment) GET /seller-service/seller/names");
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

    console.log(checkCartCnt);
    return carts.length === checkCartCnt;
  }

  function print () {
    console.log("SellerList");
    console.log(carts);
    console.log(cartProductIds);
  }

  return (
      <>
        <div className="row container-fluid">
          <button className="btn-info" onClick={print}>변수값 출력</button>
          <input type="checkbox"
                 onChange={(event) => allSellerCheckHandler(event.target.checked)}
                 checked={isAllCartChecked()}/> &nbsp; &nbsp; 전체선택
        </div>
        {
          sellerIds.map((sellerId, idx) => {
            let sellerCarts = cartMap[sellerId];

            return (
                <div className="row container-fluid">
                  <SellerName sellerId={sellerId} sellerCartCnt={sellerCarts.length} key={idx}/>
                  <CartList carts={sellerCarts} sellerId={sellerId}/>
                  <FixDiscountPolicy sellerId={sellerId }/>
                </div>
                );
          })
        }
      </>
  );

}

export default SellerList;