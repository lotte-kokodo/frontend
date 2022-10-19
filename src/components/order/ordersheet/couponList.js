import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";
import RateCouponRow from "./rateCouponRow";
import FixCouponRow from "./fixCouponRow";

/**
 * '쿠폰정보' 컴포넌트
 */

const CouponList = (props) => {

  const { url } = useContext(ServerConfigContext);
  const { headers } = useContext(AuthContext);

  const productIds = props.productIds;
  const productQtyMap = props.productQtyMap;

  const [rateCoupons, setRateCoupons] = useState([]);
  const [fixCoupons, setFixCoupons] = useState([]);

  useEffect(() => {
    getFixCoupons();
    getRateCoupons();
  }, []);


  const getRateCoupons = async () => {
    const api = url + "/promotion-service/userCoupon/rateCoupon/list";

    await axios.get(api, {params: {productIdList: productIds.join(",")}, headers: headers})
    .then((resp) => {
      console.log("[SUCCESS] (Delivery) GET /promotion-service/userCoupon/rateCoupon/list");
      console.log(resp.data.result.data);

      const data = resp.data.result.data;
      Object.values(data).map((coupons) => {
        coupons.map((coupon) => {
          setRateCoupons([...rateCoupons, coupon]);
        })
      });
    })
    .catch((err) => {
      console.log("[ERROR] (Delivery) GET /promotion-service/userCoupon/rateCoupon/list");
      console.log(err);
    })
  }

  const getFixCoupons = async () => {
    const api = url + "/promotion-service/userCoupon/fixCoupon/list";

    await axios.get(api, {params: {productIdList: productIds.join(",")}, headers: headers})
    .then((resp) => {
      console.log("[SUCCESS] (Delivery) GET /promotion-service/userCoupon/fixCoupon/list");
      console.log(resp);
      console.log(resp.data.result.data);

      const data = resp.data.result.data;
      setFixCoupons(Object.values(data));
    })
    .catch((err) => {
      console.log("[ERROR] (Delivery) GET /promotion-service/userCoupon/fixCoupon/list");
      console.log(err);
    })
  }

  return (
      <>
        <h3>쿠폰정보</h3>
        <hr/>

        {
          rateCoupons.map((coupon, idx) => {
            {
              return (
                      <RateCouponRow productId={coupon.productId}
                                     coupon={coupon}
                                     productQtyMap={productQtyMap}
                                     key={idx} />
              )
            }
          })
        }

        {
          fixCoupons.map((coupon, idx) => {
              return (
                  <FixCouponRow coupon={coupon}
                                key={idx} />
              )
          })
        }
      </>
  );
}

export default CouponList