import React, {useState, useEffect, useContext} from "react"
import axios from 'axios';

import { ServerConfigContext } from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";
import "../css/categoryAlls.css"

function CategoryAlls(props) {
    const { url } = useContext(ServerConfigContext);
    const { sellerHeaders } = useContext(AuthContext);
    const [categoryList, setCategoryList] = useState([]);
    const [propslist, setPropsList] = useState(props);

    const categoryClick = (e) => {
        console.log(e.name);
        propslist.displayCategory(e.name);
        propslist.selectCategoryId(e.id);
        propslist.displayAllCategory(false);
    }

    useEffect( () => {
        fetchCategory();
    },[]);

    const fetchCategory = async () => {
        await axios({
        method: "get",
        headers: sellerHeaders,
        url: url + "/product-service/category/all"
        })
        .then(function(response){
            console.log(response.data);
            setCategoryList(response.data.result.data);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return (
        <div>
            <div className='navContainer-category-list1'>
                <ul className='navContainer-category-list-ul1'>
                    {categoryList && 
                        categoryList.map( function(obj){
                            return(
                                <li className='navContainer-category-list-item1' onClick={() => categoryClick(obj)}>
                                    {obj.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default CategoryAlls;