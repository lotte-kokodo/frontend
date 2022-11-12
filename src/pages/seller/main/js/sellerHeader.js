import {Link, useParams} from "react-router-dom"
import "../css/sellerHeader.css"
import spoon from "../../../../src_assets/seller/spoon.png";
import logo from "../../../../src_assets/main/footer_logo.png";
import defaultProfile from "../../../../src_assets/seller/default_profile.png";
import { height } from "@mui/system";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../../context/authProvider";
import axios from "axios";
import {ServerConfigContext} from "../../../../context/serverConfigProvider";

function SellerHeader() {
    const { parmas } = useParams();
    const { sellerHeaders } = useContext(AuthContext);
    const { url } = useContext(ServerConfigContext);
    const sellerId = localStorage.getItem("sellerId");
    const [ sellerName, setSellerName ] = useState("");

    useEffect(() => {
        getSellerName();
    }, []);

    const getSellerName = async () => {
        const api = url + "/seller-service/seller/name"
        await axios.get(api, { headers: sellerHeaders })
        .then((resp) => {
            console.log(resp.data.result.data);
            setSellerName(resp.data.result.data);
        })
        .catch((err) => {

        });
    }

    return(
        <>

            <header>
                <div className="headerCenter">
                    <div className="headerCenter-logo seller-logo" >
                        <Link to={`/seller/${sellerId}`}>
                            <div style={{float:"left",width:"0px"}}>
                                <img src={logo} style={{width:"80px", height:"80px",marginTop:"10px",marginLeft:"20px", float:"left"}}></img>
                                <div style={{marginTop:"20px",marginLeft:"20px", color:"#000",width:"1000px",height:"10px"}}>KOKODO SELLER
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div style={{marginLeft:"1730px", marginTop:"10px"}}>
                        <div style={{float:"left",marginTop:"33px",marginRight:"15px"}}>
                            <strong>{sellerName}</strong>
                            <span>님</span>
                        </div>
                        <img src={defaultProfile} style={{width:"50px",height:"50px",marginTop:"20px"}}></img>
                    </div>
                </div>
            </header>

        </>
    )
}

export default SellerHeader;