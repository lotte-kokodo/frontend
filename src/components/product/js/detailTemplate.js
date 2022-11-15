import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ServerConfigContext } from "../../../context/serverConfigProvider";
import { useContext } from "react";


import highlight from '../../../src_assets/seller/nav/highlight.png'
import "../css/detailTemplate.css";
export default function DetailTemplate() {
    const { url } = useContext(ServerConfigContext);
    let { productId } = useParams(null);

    const [templateRec, setTemplateRec] = useState([]);

    // product 이미지 조회
useEffect(() => {
    const fetchData = async () => {
        await axios.get(url + `/product-service/templateRec/${productId}`)
            .then(function (resp) {
                
                console.log(resp.data);
                setTemplateRec(resp.data.result.data);
                

            })
            .catch(function (error) {
                console.log(error);
            })
    }
    fetchData(productId);
}, []);
   
    return (

        <>
             {true &&   <div>
                            <div className="seller-template-write">
                                <div className="template-already-container">
                                    <div className="already-title">{templateRec.writingTitle}</div>
                                    <div className="already-titleDetail">{templateRec.writingTitleDetail}</div>
                                    <div className="already-image1">
                                        <img className="seller-template-already-image1" src={templateRec.imageOne} alt="image1" />
                                    </div>
                                    <div className="template-already-highlight">
                                        <div className="tempalte-already-highlight1">
                                            <span>
                                                <img className="already-icon-highlight" alt="highlight" src={highlight}/>
                                            </span>
                                            &nbsp;{templateRec.writingHighlightOne}
                                        </div>
                                        <div className="tempalte-already-highlight2">
                                            <span>
                                                <img className="already-icon-highlight" alt="highlight" src={highlight}/>
                                            </span>
                                            &nbsp;{templateRec.writingHighlightTwo}
                                        </div>
                                    </div>
                                    <div className="already-image2">
                                        <img className="seller-template-already-image2" src={templateRec.imageTwo} alt="image2" />
                                    </div>
                                    <div className="already-productName">{templateRec.writingName}</div>
                                    <div className="already-productDetail">{templateRec.writingDescription}</div>
                                    <div className="already-image3">
                                        <img className="seller-template-already-image3" src={templateRec.imageThree} alt="image2" />
                                    </div>
                                    <div className="already-image4">
                                        <img className="seller-template-already-image4" src={templateRec.imageFour} alt="image2" />
                                    </div>
                                    <div className="already-image5">
                                        <img className="seller-template-already-image5" src={templateRec.imageFive} alt="image2" />
                                    </div>
                                </div>
                                
                            </div>
                        </div>    }
        </>
    )
}