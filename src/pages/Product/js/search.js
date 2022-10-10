import axios from 'axios';
import {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';

import "../css/category.css"
import "../../Main/css/main.css"

function Search() {
    const location = useLocation();
    const word = location.state.word;

    const [searchProduct,setSearchProduct] = useState([]);

    useEffect(() => {
        fetchSearch(word);
    },[word]);

    const fetchSearch = async (word) => {
        await axios({
          method: "get",
          url: "http://localhost:9270/product/totalSearch/" + word
        })
        .then(function(response){
          setSearchProduct(response.data.result.data);
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
                </div>


                <div className="category-product" >
                    <h3 className='category-product-title'> <span className='cateNum'>총 {searchProduct.length}</span>개 상품이 있습니다.</h3>
                    <div className='product-list'>
                        {
                            searchProduct.map( function(object, i){
                                return(
                                    <CategoryItem obj={object} key={i} cnt={i + 1} />
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

function CategoryItem(props) {
    const priceChange = props.obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return(
        <button className='product-div' onClick={"onHandlerNewImage" + props.cnt}>
            <div className='product-thumbnail'>
                <img className='product-thumbnail-img' alt='new-product' src={props.obj.thumbnail} />
            </div>
            <div className='product-displayName'>
                <strong>{props.obj.displayName}</strong>
                <div className='product-price'>
                    {priceChange} 원
                </div>
            </div>
        </button>
        
    )
}

export default Search;