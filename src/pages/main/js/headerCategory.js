import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImgHover = () => {
    const [isListHover, setIsListHover] = useState(false);
    const [categoryList,setCategoryList] = useState([]);

    const fetchCategory = async () => {
        await axios({
        method: "get",
        url: "http://localhost:9270/category/all"
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
                    <img className="headerCenter-category-line" alt="nav-line" src="img/top/navContainer-category-Line.png" />
                    </div>
                    <div>
                    <img className="headerCenter-category-line" alt="nav-line" src="img/top/navContainer-category-Line.png" />
                    </div>
                    <div>
                    <img className="headerCenter-category-line" alt="nav-line" src="img/top/navContainer-category-Line.png" />
                    </div>
                </div>
                
                <img
                    className="navContainer-category-Rectangle" alt="nav-rec"
                    src={isListHover ? "img/top/header-hover-rectangle.png" : "img/top/navContainer-category-Rectangle.png"}
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