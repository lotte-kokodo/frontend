import { useParams } from "react-router-dom";

export default function SellerTitle(props) {


    return (
        <h2 style={{marginLeft : "240px", marginTop:"30px"}}>{props.title}</h2>
    )
}