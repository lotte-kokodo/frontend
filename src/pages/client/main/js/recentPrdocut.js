import { WindowRounded } from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import "../css/recentPrdocut.css";
import {RecentProductContext} from "../../../../context/recentProductProvider";

function RecentPrdocut() {
    const { watchList, watchImg } = useContext(RecentProductContext);

    useEffect(() => {

    },[watchList]);

    return(
        <div className="watch-container">
            {watchList && watchList.length > 0 ? 
                <div className="watch-item">
                    <div className="watch-title">최근 본 상품</div>
                    {watchList && watchList.map(function(id, i){
                        return(
                            <Item watchImgSrc={watchImg[i]} watchId={id} key={i} />
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
    let watchImgSrc = props.watchImgSrc;
    let watchId = props.watchId;

    return(
        <NavLink to={`/productDetail/${watchId}`}>
            <div>
                <img src = {watchImgSrc} alt = {watchId}/>
            </div>
        </NavLink>
        
    )
}

export default RecentPrdocut;