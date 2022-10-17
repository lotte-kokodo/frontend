import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";
import CouponRow from "./couponRow";

/**
 * '쿠폰정보' 컴포넌트
 */

const CouponList = (props) => {

  const { url } = useContext(ServerConfigContext);
  const { headers } = useContext(AuthContext);

  const productIds = props.productIds;
  const productQtyMap = props.productQtyMap;

  const [fixCoupons, setFixCoupons] = useState([]);
  const [rateCoupons, setRateCoupons] = useState([]);

  useEffect(() => {
    getFixCoupons();
    getRateCoupons();
  }, []);

  const getFixCoupons = async () => {
    const api = url + "/promotion-service/userCoupon/fixCoupon/list";

    await axios.get(api, {params: {productIdList: productIds.join(",")}, headers: headers})
    .then((resp) => {
      console.log("[SUCCESS] (Delivery) GET /promotion-service/userCoupon/fixCoupon/list");
      console.log(resp);
      console.log(resp.data.result.data);

      const data = resp.data.result.data;
      setFixCoupons(data);
    })
    .catch((err) => {
      console.log("[ERROR] (Delivery) GET /promotion-service/userCoupon/fixCoupon/list");
      console.log(err);
    })
  }

  const getRateCoupons = async () => {
    const api = url + "/promotion-service/userCoupon/rateCoupon/list";

    await axios.get(api, {params: {productIdList: productIds.join(",")}, headers: headers})
    .then((resp) => {
      console.log("[SUCCESS] (Delivery) GET /promotion-service/userCoupon/rateCoupon/list");
      console.log(resp.data.result.data);

      const data = resp.data.result.data;
      setRateCoupons(data);
    })
    .catch((err) => {
      console.log("[ERROR] (Delivery) GET /promotion-service/userCoupon/rateCoupon/list");
      console.log(err);
    })
  }

  const print = () => {
    console.log(rateCoupons);
    console.log(fixCoupons);
  }

  return (
      <>
        <h3>쿠폰정보</h3>
        <hr/><button onClick={print}>버튼</button>
        {
          rateCoupons.map((coupon, idx) => {

            {
              return (
                  coupon.rateCouponList.map((c) =>
                      <CouponRow productId={coupon.productId}
                                 coupon={c}
                                 productQtyMap={productQtyMap}
                                 key={idx} />
                  )
              )
            }

          })
        }

        {
          fixCoupons.map((coupon, idx) => {

            {
              return (
                  coupon.fixCouponList.map((c) =>
                      <CouponRow productId={coupon.productId}
                                 coupon={c}
                                 productQtyMap={productQtyMap}
                                 key={idx} />
                  )
              )
            }

          })
        }
      </>
  );
}

export default CouponList