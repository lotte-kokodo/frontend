import { WindowRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/recentPrdocut.css";

function RecentPrdocut() {
    let [watchImg, setImg] = useState(localStorage.getItem("watchImage"));
    let [watchList, setWatch] = useState([]);

    useEffect(() => {
        setImg(localStorage.getItem("watchImage"));

        if(watchImg !== null) {
            setWatch(JSON.parse(watchImg));
        }

    },[])

    return(
        <div className="watch-container">
            {watchList && watchList.length > 0 ? 
                <div className="watch-item">
                    <div className="watch-title">최근 본 상품</div>
                    {watchList && watchList.map(function(object, i){
                        return(
                            <Item obj={object} key={i} cnt={i + 1} />
                        )
                    })}
                </div>
                :
                <div></div>
            }   
        </div>
    )
}

function Item(props){
    let watchId = localStorage.getItem("watchId");
    watchId = JSON.parse(watchId);

    return(
        <NavLink to={`/productDetail/${watchId[props.cnt-1]}`}>
            <div>
                <img src = {props.obj} alt = {props.id}/>
            </div>
        </NavLink>
        
    )
}

export default RecentPrdocut;