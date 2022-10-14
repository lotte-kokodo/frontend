import {Link, useParams} from "react-router-dom"
import "../css/sellerHeader.css"

function SellerHeader() {
    const parmas = useParams();

    return(
        <div>
            <div className="headerCenter">
                <div className="headerCenter-logo seller-logo">
                    <Link to={`/seller/${parmas.sellerId}`}>
                        <div>KOKODO</div>
                        <div>SELLER</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SellerHeader;