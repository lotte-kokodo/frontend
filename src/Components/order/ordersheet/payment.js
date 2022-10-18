/**
 * '결제정보' 컴포넌트
 */

// Context
import {OrderContext} from "../../../context/orderProvider";

// Module
import axios from "axios";
import {useContext, useEffect, useState} from "react"
import {AuthContext} from "../../../context/authProvider";
import {ServerConfigContext} from "../../../context/serverConfigProvider";


const Payment = (props) => {

  const { orderProducts, checkCoupons } = useContext(OrderContext);
  const { url } = useContext(ServerConfigContext);
  const { headers } = useContext(AuthContext);

  const productQtyMap = props.productQtyMap;

  const [sellerFixPolicy, setSellerFixPolicy] = useState({});
  const [ totalPrice, setTotalPrice ] = useState(999999);
  const [ discPrice, setDiscPrice ] = useState(0);
  const [ delPrice, setDelPrice ] = useState(999999);
  const [ payPrice, setPayPrice ] = useState(999999);

  useEffect(() => {
    getFixDiscountPolicy();
    calcPaymentPrice();
  }, [orderProducts.length, checkCoupons.length]);

  // 배송비 정책 조회
  const getFixDiscountPolicy = async () => {

    const api = url + "/promotion-service/fix-discount/status";
    let productIds = [];
    let sellerIds = [];
    Object.values(orderProducts).map((product) => {
      productIds.push(product.productId);
      sellerIds.push(product.sellerId);
    });

    const params = {
      productIdList: productIds.join(","),
      sellerIdList : sellerIds.join(",")
    }

    await axios.get(api, {params: params, headers: headers})
    .then((resp) => {
      console.log("[SUCCESS] (Payment) GET /promotion-service/fix-discount/status");

      const data = resp.data.result.data;
      console.log(data);

      setSellerFixPolicy(data);
    })
    .catch((err) => {
      console.log("[ERROR] (Payment) GET /promotion-service/fix-discount/status");
      console.log(err);
    });
  }

  const calcPaymentPrice = () => {
    // 상품 총 금액 계산
    let tPrice = 0;
    Object.values(orderProducts).map((product) => {
      tPrice += product.unitPrice*productQtyMap[product.productId];
    });
    setTotalPrice(tPrice);

    // 총 할인금액 계산
    let discPrice = 0;
    Object.values(orderProducts).map((product) => {
      const productTotalPrice = product.unitPrice*productQtyMap[product.productId];

      if (product.discRate !== 0) {
        discPrice += Math.floor(productTotalPrice * (product.discRate*0.01));
      }

      // 사용자가 비율 할인쿠폰을 선택했다면
      const coupon = checkCoupons[product.productId];
      if (coupon && coupon.rate && productTotalPrice >= coupon.minPrice) {
        discPrice += Math.floor(productTotalPrice * (coupon.rate*0.01));
      }
    });
    setDiscPrice(discPrice);

    // 배송비 계산
    const sellers = [];
    Object.values(orderProducts).map((product) => {
      if (!sellers.includes(product.sellerId)) {
        sellers.push(product.sellerId);
      }
    });

    let delPrice = 0;
    sellers.map((sellerId) => {
      if (!sellerFixPolicy[sellerId]) {
        delPrice += 3000;
      }
    });
    setDelPrice(delPrice);

    setPayPrice(tPrice-discPrice-delPrice);
  }

  return (
      <>
        <h3>결제예정금액</h3><hr/>
        <table>
          <tbody>
          <tr>
            <td>상품금액</td>
            <td>{totalPrice} 원</td>
          </tr>
          <tr>
            <td>상품할인금액</td>
            <td>-{discPrice} 원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>{delPrice} 원</td>
          </tr>
          </tbody>
        </table>
        <hr/>
        <div>
          <span>{payPrice} 원</span>
        </div>
      </>
  )
}

export default Payment
