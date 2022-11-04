import axios from 'axios';
import {useState, useEffect} from "react";
import {NavLink,useLocation} from 'react-router-dom';
import Pagination from "react-js-pagination";

import "../css/paging.css"
import "../css/category.css"
import "../../main/css/main.css"

function Search() {
    const location = useLocation();
    const word = location.state.word;

    const [searchProduct,setSearchProduct] = useState([]); //아이템
    const [count, setCount] = useState(0); //아이템 총 수
    const [currentpage, setCurrentpage] = useState(1); //현재페이지
    const [postPerPage] = useState(20); //페이지당 아이템 개수
    const [num,setNum] = useState(1); // 정렬 flag

    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]);

    const Paging = ({page, count, setPage}) => {
        return (
            <Pagination
                    activePage={page}
                    itemsCountPerPage={20}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={setPage} />
        );
    }
  
    const setPage = (e) => {
        setCurrentpage(e);
    };
  
    useEffect(() => {
        setCount(count);
        setIndexOfLastPost(currentpage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(searchProduct);
    }, [currentpage, indexOfFirstPost, indexOfLastPost, searchProduct, postPerPage]);

    
    useEffect(() => {
        fetchSearch();
    },[num,word,currentpage]);

    /* 정렬 */
    const sortingRecommendation = () => {
        setNum(1);
    }
    
    const sortingHighPrice = () => {
        setNum(2);
    }

    const sortingLowPrice = () => {
        setNum(3);
    }

    const sortingNewProduct = () => {
        setNum(4);
    }

    const fetchSearch = async () => {
        await axios({
            method: "get",
            url: "http://localhost:8001/product-service/product/totalSearch/" + word + "/" + num + "/" + currentpage
        })
        .then(function(response){
            setSearchProduct(response.data.result.data.productDtoList);
            setCount(response.data.result.data.totalCount);
        })
        .catch(function(error){
            console.log(error);
        })
    }


    return(
        <div>
            <div className='cateogryProduct'>
                <div className='cateogryProduct-name'>
                    <h3>{word} 검색결과</h3>
                </div>

                <div className='cateogryProduct-sort'>
                    <hr />
                    <div className='categoryProduct-sorting'>
                        <ul className='categoryProduct-sortingUl'>
                            <button onClick={sortingRecommendation}><li>추천순</li></button>
                            <button onClick={sortingHighPrice}><li>높은가격순</li></button>
                            <button onClick={sortingLowPrice}><li>낮은가격순</li></button>
                            <button onClick={sortingNewProduct}><li>신상품순</li></button>
                        </ul>
                    </div>
                    <hr />
                </div>


                <div className="category-product" >
                    <h3 className='category-product-title'> <span className='cateNum'>총 {count}</span>개 상품이 있습니다.</h3>
                    <div className='product-list'>
                        { currentPosts && searchProduct.length  >0 ?
                            currentPosts.map( function(object, i){
                                return(
                                    <CategoryItem obj={object} key={i} cnt={i + 1} />
                                )
                            })
                            :
                            <div> 상품이 없습니다. </div>
                        }
                    </div>

                    <Paging page={currentpage} count={count} setPage={setPage} />
                </div>
                
            </div>
        </div>
    )
}

function CategoryItem(props) {
    const priceChange = props.obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return(
        <NavLink to={`/productDetail/${props.obj.id}`} className='product-div'>
            <div className='product-thumbnail'>
                <img className='product-thumbnail-img' alt='new-product' src={props.obj.thumbnail} />
            </div>
            <div className='product-displayName'>
                <strong>{props.obj.displayName}</strong>
                <div className='product-price'>
                    {priceChange} 원
                </div>
            </div>
        </NavLink>
        
    )
}

export default Search;