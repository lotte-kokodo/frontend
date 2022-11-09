import {Link, useParams} from "react-router-dom"
import "../css/sellerHeader.css"
import spoon from "../../../../src_assets/seller/spoon.png";
import logo from "../../../../src_assets/main/footer_logo.png";
import defaultProfile from "../../../../src_assets/seller/default_profile.png";
import { height } from "@mui/system";

function SellerHeader() {
    const parmas = useParams();

    return(
        <header>
            <div className="headerCenter">
                <div className="headerCenter-logo seller-logo" >
                    <Link to={`/seller/${parmas.sellerId}`}>
                        <div style={{float:"left",width:"0px"}}>
                            <img src={logo} style={{width:"80px", height:"80px",marginTop:"10px",marginLeft:"20px", float:"left"}}></img>
                            <div style={{marginTop:"20px",marginLeft:"20px", color:"#000",width:"1000px",height:"10px"}}>KOKODO SELLER
                            </div>
                        </div>
                    </Link>
                </div>

                <div style={{marginLeft:"1730px", marginTop:"10px"}}>
                    <div style={{float:"left",marginTop:"33px",marginRight:"15px"}}><strong>kokodo </strong><span>님</span></div>
                    <img src={defaultProfile} style={{width:"50px",height:"50px",marginTop:"20px"}}></img>
                </div>
            </div>
        </header>
    )
}

export default SellerHeader;