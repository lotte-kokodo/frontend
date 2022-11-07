import React, { useState} from 'react';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import line from '../../../../src_assets/top/navContainer-category-Line.png'
import pinkRect from '../../../../src_assets/top/navContainer-category-Rectangle.png'
import blackRect from '../../../../src_assets/top/header-hover-rectangle.png'
import { ServerConfigContext } from "../../../../context/serverConfigProvider";

const ImgHover = () => {
    const { url } = useContext(ServerConfigContext);
    const [isListHover, setIsListHover] = useState(false);
    const [categoryList,setCategoryList] = useState([]);

    const fetchCategory = async () => {
        await axios({
        method: "get",
        url: url + "product-service/category/all"
        })
        .then(function(response){
            setCategoryList(response.data.result.data);
            console.log(response.data.result.data);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    return (
        <div
        onMouseOver={() => {
                setIsListHover(true);
                if(categoryList.length===0) fetchCategory();
            }
        }
        onMouseOut={() => setIsListHover(false)}
        >
            <div className='navContainer-category-shape'>
                <div className="navContainer-category-overlap">
                    <div>
                    <img className="headerCenter-category-line" alt="nav-line" src={line} />
                    </div>
                    <div>
                    <img className="headerCenter-category-line" alt="nav-line" src={line} />
                    </div>
                    <div>
                    <img className="headerCenter-category-line" alt="nav-line" src={line} />
                    </div>
                </div>
                
                <img
                    className="navContainer-category-Rectangle" alt="nav-rec"
                    src={isListHover ? blackRect : pinkRect}
                />
            </div>

            {isListHover ?
                <div className='navContainer-category-list'>
                    <ul className='navContainer-category-list-ul'>
                        {
                            categoryList.map( function(object,i){
                                return(
                                    <LiRow obj={object} key={i} cnt={i + 1} />
                                )
                            })
                        }
                    </ul>
                </div>

                :
                <div></div>
            }
        </div>
    )
}

function LiRow(props) {
    // link용
    const history = useNavigate();

    const categoryProduct = () => {
        history('/category', {
            state: {
                seq: props.cnt,
                name: props.obj.name
            }
        })
    };

    return(
        <button onClick={categoryProduct}>
            <li className='navContainer-category-list-item'>
                {props.obj.name}
            </li>
        </button>
    );
}

export default ImgHover;