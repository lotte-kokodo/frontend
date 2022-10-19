import axios from 'axios';
import {useState, useEffect} from "react";
import {NavLink,useLocation} from 'react-router-dom';
import Pagination from "react-js-pagination";

import "../css/category.css"
import "../../main/css/main.css"

function Search() {
    const location = useLocation();
    const word = location.state.word;

    useEffect(() => {
        fetchSearch(word);
    },[word]);

    const fetchSearch = async (word) => {
        await axios({
          method: "get",
          url: "http://localhost:8001/product-service/product/totalSearch/" + word
        })
        .then(function(response){
          setSearchProduct(response.data.result.data);
        })
      }

      const [searchProduct,setSearchProduct] = useState([]); //아이템
      const [count, setCount] = useState(0); //아이템 총 수
      const [currentpage, setCurrentpage] = useState(1); //현재페이지
      const [postPerPage] = useState(20); //페이지당 아이템 개수
  
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
          setCount(searchProduct.length);
          setIndexOfLastPost(currentpage * postPerPage);
          setIndexOfFirstPost(indexOfLastPost - postPerPage);
          setCurrentPosts(searchProduct.slice(indexOfFirstPost, indexOfLastPost));
      }, [currentpage, indexOfFirstPost, indexOfLastPost, searchProduct, postPerPage]);
  

    return(
        <div>
            <div className='cateogryProduct'>
                <div className='cateogryProduct-name'>
                    <h3>{word} 검색결과</h3>
                </div>

                <div className='cateogryProduct-sort'>
                    <hr />
                </div>


                <div className="category-product" >
                    <h3 className='category-product-title'> <span className='cateNum'>총 {searchProduct.length}</span>개 상품이 있습니다.</h3>
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