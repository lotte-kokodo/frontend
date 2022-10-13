import {Link} from "react-router-dom"
import "../css/sellerHeader.css"

function SellerHeader() {
    return(
        <div>
            <div className="headerCenter">
                <div className="headerCenter-logo seller-logo">
                    <Link to="/seller">
                        <div>KOKODO</div>
                        <div>SELLER</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SellerHeader;

//성은 짱짱
//성은 최고