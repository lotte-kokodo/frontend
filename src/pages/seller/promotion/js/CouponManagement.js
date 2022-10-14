import SellerTitle from '../../../../components/seller/sellerTitle';

function CouponManagement() {

    return (
        <div class="board">
            <SellerTitle title="쿠폰 관리"></SellerTitle>
            <button  style={{backgroundColor: "#FB7D98", padding : "10px", paddingLeft:"40px", paddingRight:"40px", textAlign:"center", 
                color:"#fff", borderRadius: "10px", margin: "20px 25px", boxShadow: "1px 1px 1px 1px gray"}}>+  할인 쿠폰 만들기</button>
        </div>
    )

}

export default CouponManagement;