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

  const [coupons, setCoupons] = useState([]);

  const api = url + "/promotion-service/..";

  useEffect(() => {
    // TODO: 쿠폰 리스트 요청
    // getCoupons();
  }, []);

  const getCoupons = async () => {
    await axios.get(api, {headers: headers})
    .then((resp) => {
      console.log("[SUCCESS] (Delivery) GET /member-service/member/orderInfo");
      console.log(resp.data.result.data);

      setCoupons(resp.data.result.data);
    })
    .catch((err) => {
      console.log("[ERROR] (Delivery) GET /member-service/member/orderInfo");
      console.log(err);
    })
  }

  return (
      <>
        <h3>쿠폰정보</h3>
        <hr/>
        {
          coupons.map((coupon, idx) => {
            return (
                <CouponRow coupon={coupon} key={idx} />
          )
          })
        }
      </>
  );
}

export default CouponList