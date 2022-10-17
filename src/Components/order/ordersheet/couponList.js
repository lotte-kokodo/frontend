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
      data.map((dto) => {
        const coupons = dto["fixCouponList"];
        coupons.map((coupon) => {
          setFixCoupons([...fixCoupons, coupon])
        })
      })
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
      data.map((dto) => {
        const coupons = dto["rateCouponList"];
        coupons.map((coupon) => {
          setRateCoupons([...rateCoupons, coupon])
        })
      })
    })
    .catch((err) => {
      console.log("[ERROR] (Delivery) GET /promotion-service/userCoupon/rateCoupon/list");
      console.log(err);
    })
  }

  const print = () => {
    console.log(fixCoupons);
    console.log(rateCoupons);
  }

  return (
      <>
        <button onClick={print}>버튼</button>
        <h3>쿠폰정보</h3>
        <hr/>
        {
          fixCoupons.map((coupon, idx) => {
              return (
                  <CouponRow coupon={coupon} key={idx} />
              )
          })
        }
        {
          rateCoupons.map((coupon, idx) => {
            return (
                <CouponRow coupon={coupon} key={idx} />
            )
          })
        }

      </>
  );
}

export default CouponList