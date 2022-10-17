import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/recentPrdocut.css";

function RecentPrdocut() {
    const [watchList, setWatch] = useState([]);

    useEffect(() => {
        let watchImg = localStorage.getItem("watchImage");

        if(watchList==null) {
            watchList = [];
        }else{
            watchImg = JSON.parse(watchImg);
            setWatch(watchImg);
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
    const test = () => {console(props.cnt)};
    return(
        <NavLink to={`/productDetail/${watchId[props.cnt-1]}`} onClick={test}>
            <div>
                <img src = {props.obj} alt = {props.id}/>
            </div>
        </NavLink>
        
    )
}

export default RecentPrdocut;