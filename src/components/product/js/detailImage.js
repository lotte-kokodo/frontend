import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ServerConfigContext } from "../../../context/serverConfigProvider";

import "../css/detailImage.css";

export default function ProductDetail() {
    const { url } = useContext(ServerConfigContext);
    let { productId } = useParams(null);

    const [detailImages, setDetailImages] = useState([]);


// product 이미지 조회
useEffect(() => {
    const fetchData = async () => {
        await axios.get(url + `/product-service/productDetail/${productId}`)
            .then(function (resp) {
                setDetailImages(resp.data.result.data);

            })
            .catch(function (error) {
                console.log(error);
            })
    }
    fetchData(productId);
}, []);

    return (
        <div>
            {
            detailImages.map( function(object,i){ 
                    return (
                        <img key={i} className="detail-image" src={object.image} style={{verticalAlign:"middle"}}></img>
                    )
                })
            }

        </div>

    )
}
