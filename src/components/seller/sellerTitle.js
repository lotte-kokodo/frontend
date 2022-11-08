import { useParams } from "react-router-dom";

export default function SellerTitle(props) {


    return (
        <h1 style={{marginLeft : "240px", marginTop:"50px"}}>{props.title}</h1>
    )
}