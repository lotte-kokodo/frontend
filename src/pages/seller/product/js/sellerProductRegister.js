import React, {useRef, useState, useContext} from "react"
import DatePicker from "react-datepicker";
import axios from 'axios';

import highlight from '../../../../src_assets/seller/nav/highlight.png'
import { useNavigate } from "react-router-dom";
import { ServerConfigContext } from "../../../../context/serverConfigProvider";
import {AuthContext} from "../../../../context/authProvider"
import productRegisterImg from "../../../../src_assets/seller/title/product-register.png";


import "../css/sellerProductRegister.css"
import "../css/categoryAlls.css"

function SellerProductRegister() {
    const { url } = useContext(ServerConfigContext);
    const { sellerHeaders } = useContext(AuthContext);
    const sellerId = localStorage.getItem("sellerId");
    const history = useNavigate();

    // useRef를 이용해 input태그에 접근한다.
    const imageInput = useRef();
    const imageDetailInput = useRef();
    const imageTemplateInput = useRef();

    // 노출 상품명
    const [formDisplayName, setFormDisplayName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [deadline, setDeadline] = useState(new Date());

    // 카테고리 찾기, 전체, 삭제 버튼
    const [formCategory, setFormCategory] = useState(""); //input 카테고리 검색
    const [selectCategory, setSelectCategory] = useState(""); // 카테고리 이름 최종 선택
    const [selectCategoryId, setSelectCategoryId] = useState(""); // 카테고리 Id
    const [displayAllCategory, setDisplayAllCategory] = useState(false); // 카테고리 전체 보이도록 하는 flag
    const [categoryList, setCategoryList] = useState([]); // 카테고리 List
    
    const onClickFormCategory = (e) => {
        setFormCategory(e.target.value);
    }

    const categorySearch = () => {
        fetchCategorySearch(formCategory)
    }

    const categoryAll = () => {
        if(!displayAllCategory) fetchCategory();
        setDisplayAllCategory(!displayAllCategory);
    }

    const categoryDelete = () => {
        setSelectCategory("");
        setFormCategory("");
    }

    const categoryClick = (e) => {
        setSelectCategory(e.name);
        setSelectCategoryId(e.id);
        setDisplayAllCategory(false);
    }

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

    const fetchCategorySearch = async (categorySearch) => {
        await axios({
            method: "get",
            headers: sellerHeaders,
            url: url + "/product-service/category/categoryName/" + categorySearch
        })
        .then(function(response){
            console.log(response);
            setSelectCategory(response.data.result.data[0].name);
            setSelectCategoryId(response.data.result.data[0].id);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    
    // 템플릿 저장 여부
    const [templateCheck, setTemplateCheck] = useState(false);

    // 템플릿 자동 글
    const [sellerTitle, setSellerTitle] = useState('');
    const [sellerTitleDetail, setSelerTitleDetail ] = useState('');
    const [sellerTitleHighlight1, setSellerTitleHighlight1 ] = useState('');
    const [sellerTitleHighlight2, setSellerTitleHighlight2 ] = useState('');
    const [sellerProductName, setSellerProductName ] = useState('');
    const [sellerProductDetail, setSellerProductDetail ] = useState('');
    const [detailFileImageList, setDetailFileImageList] = useState([]);
    const [ detailTemplateFileImageList, setDetailTemplateFileImageList] = useState([]);

    /* 대표 이미지 미리보기 url 생성 */

    // 대표 이미지 url 저장해줄 state
    const [fileImage, sestFileImage] = useState("");
    const [thumbnail, setThumbnail] = useState('');

      // 대표 이미지 파일 저장
      const saveFileImage = (e) => {
        URL.revokeObjectURL(fileImage);
        sestFileImage("");

        sestFileImage(URL.createObjectURL(e.target.files[0]));
        setThumbnail(e.target.files[0]);
    }

    // 대표 이미지 버튼클릭시 input 태그에 클릭이벤트를 걸어준다.
    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    /* 이미지 디테일 미리보기 url 생성 */

    // 이미지 디테일 url 저장해줄 state
    const [fileImageDetail, sestFileImageDetail] = useState([]);

    // 이미지 디테일 파일 저장
    const saveFileImageDetail = (e) => {
        const imageLists = e.target.files;
        let urlList = [];
        setDetailFileImageList(imageLists);


        for(let i=0; i<imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            urlList.push(currentImageUrl);
        }

        if(urlList.length > 8) urlList = urlList.slice(0,8);
        sestFileImageDetail(urlList);
    }

    // 이미지 디테일 파일 삭제
    const deleteFileImageDetail = (id) => {
        sestFileImageDetail(fileImageDetail.filter((_,index) => index !== id));
    }

    /* 이미지 템플릿 미리보기 url 생성 */

    // 이미지 템플릿 url 저장해줄 state
    const [fileImageTemplate, sestFileImageTemplate] = useState([]);

    // 이미지 디테일 파일 저장
    const saveFileImageTemplate = (e) => {
        const imageLists = e.target.files;
        let urlList = [];

        setDetailTemplateFileImageList(imageLists);

        for(let i=0; i<imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            urlList.push(currentImageUrl);
        }

        if(urlList.length > 8) urlList = urlList.slice(0,8);
        sestFileImageTemplate(urlList);
    }

    // 이미지 디테일 파일 삭제
    const deleteFileImageTemplate = (id) => {
        sestFileImageTemplate(fileImageTemplate.filter((_,index) => index !== id));
    }

    // 이미지 디테일 버튼클릭시 input 태그에 클릭이벤트를 걸어준다.
    const onClickDetailImageUpload = () => {
        imageDetailInput.current.click();
    };

    const onClickTemplateImageUpload = () => {
        imageTemplateInput.current.click();
    };

    // Input Handler 태그
    const onClickFormDisplayName = (e) => {
        setFormDisplayName(e.target.value);
    };

    const onClickPrice = (e) => {
        setPrice(e.target.value);
    };

    const onClickStock = (e) => {
        setStock(e.target.value);
    };

    const onHandlersellerTitle = (e) => {
        setSellerTitle(e.target.value);
    };

    const onHandlersellerTitleDetail = (e) => {
        setSelerTitleDetail(e.target.value);
    };

    const onHandlersellerTitleHighlight1 = (e) => {
        setSellerTitleHighlight1(e.target.value);
    };

    const onHandlersellerTitleHighlight2 = (e) => {
        setSellerTitleHighlight2(e.target.value);
    };

    const onHandlersellerProductName = (e) => {
        setSellerProductName(e.target.value);
    };

    const onHandlersellerProductDetail = (e) => {
        setSellerProductDetail(e.target.value);
    };

    // Template 저장인지 아닌지 확인
    const sellerDetailImage = () => {
        setTemplateCheck(false);
    }

    const sellerDetailTemplate = () => {
        setTemplateCheck(true);
    }

    // 미리보기 버튼
    const[visible, setVisible] = useState(false);


    const onClickAlreadyProduct = () => {
        setVisible(true);
    }

    // 상품 등록 axios
    const fetchProduct = async (param) => {
        console.log(templateCheck==false?"img":"tempalte");
        const productParams = {
            categoryId: selectCategoryId,
            thumbnail: fileImage,
            name: formDisplayName,
            price: price,
            stock: stock,
            deadline: deadline,
            displayName: formDisplayName,
            sellerId: sellerId,
            deliveryFee: 3000
        };

        const fd = new FormData();
        fd.append(
            "data",
            new Blob([JSON.stringify(productParams)], { type: "application/json" })
        ); // JSON 형식으로 파싱 후 추가
        fd.append("thumbnail",thumbnail);
        // 이미지 디테일 경우
        if(templateCheck== false){

            console.log("img");
            

            let files = detailFileImageList;
            for (let i = 0; i < files.length; i++) {
                fd.append("files", files[i]);
            }
            
            await axios({
                method: "post",
                url: url + "/seller-service/product",
                headers: sellerHeaders,
                data : fd
            })
            .then(function(response){
                if(response.data.success) {
                    alert("상품 등록에 성공하셨습니다.");
                    history(`/seller/${sellerId}`);
                }else{
                    alert("상품 등록에 실패하셨습니다.");
                }
            })
            .catch(function(error){
                alert("상품 등록에 실패하셨습니다.");
                console.log(error);
            })
        }
        else{
            console.log("template");
            const templateArticle = {
                sellerTitle: sellerTitle,
                sellerTitleDetail: sellerTitleDetail,
                sellerTitleHighlight1: sellerTitleHighlight1,
                sellerTitleHighlight2: sellerTitleHighlight2,
                sellerProductName: sellerProductName,
                sellerProductDetail: sellerProductDetail
            };

            fd.append(
                "templateArticle",
                new Blob([JSON.stringify(templateArticle)], { type: "application/json" })
            ); 
            let files = detailTemplateFileImageList;
            for (let i = 0; i < files.length; i++) {
                fd.append("files", files[i]);
            }


            await axios({
                method: "post",
                url: url + "/seller-service/product/template",
                headers: sellerHeaders,
                data : fd
            })
            .then(function(response){
                if(response.data.success) {
                    alert("상품 등록에 성공하셨습니다.");
                    history(`/seller/${sellerId}`);
                }else{
                    alert("상품 등록에 실패하셨습니다.");
                }
            })
            .catch(function(error){
                alert("상품 등록에 실패하셨습니다.");
                console.log(error);
            })

        }
    }


    // 상품 등록 
    const onClickRegisterProduct = () => {
        const productParams = {"categoryId":selectCategoryId,"thumbnail":fileImage,"name":formDisplayName,"price":price,"stock":stock,"deadline":deadline,"displayName":formDisplayName,"sellerId":sellerId,"deliveryFee":3000};

        if(fileImage===null || fileImage==="") {
            alert("대표 이미지를 등록하세요.");
        }else if(formDisplayName===null || formDisplayName===""){
            alert("노출 상품명을 입력하세요.");
        }else if(price===null || price===""){
            alert("가격을 입력하세요.");
        }else if(stock===null || stock===""){
            alert("재고를 입력하세요.");
        }else if(deadline===null || deadline===""){
            alert("유통기한을 입력하세요.");
        }else if(selectCategory===null || selectCategory===""){
            alert("카테고리를 입력하세요.");
        }else{
            if(templateCheck === true) {
                if(fileImageTemplate.length !== 5) {
                    alert("템플릿 이미지 5개 등록은 필수입니다.");
                }else if(sellerTitle === null || sellerTitle === ""
                        || sellerTitleDetail === null || sellerTitleDetail === ""
                        || sellerTitleHighlight1 === null || sellerTitleHighlight1 === ""
                        || sellerTitleHighlight2 === null || sellerTitleHighlight2 === ""
                        || sellerProductName === null || sellerProductName === ""
                        || sellerProductDetail === null || sellerProductDetail === ""){
                    alert("글 등록 6개는 필수입니다.")
                }else{
                    fetchProduct(productParams);
                }
            }else { // 이미지 디테일
                if(fileImageDetail.length <= 0 || fileImageDetail===null) {
                    alert("이미지 디테일 사진은 필수입니다.");
                }else{
                    fetchProduct(productParams);
                }
            }
        }
    }

    return (
        <div className="seller-product-container">

            <div className="seller-product-resgister">
                <div className="seller-product-register-div">
                <img className="seller-product-register-img" src={productRegisterImg} ></img>
                <h2 className="seller-product-resgister-h2">상품 등록</h2>
                </div>
            </div> 

            <div className="seller-product-div1">
                <div>
                    <h5>대표 이미지 등록 (1개)</h5>
                </div>
                <div>
                    <input type="file" multiple="multiple" ref={imageInput} name="representImage" accept="image/jpg, image/png, image/jpeg" onChange={saveFileImage}/>
                    <button className="seller-product-image-button" onClick={onClickImageUpload}>
                        <span>+</span>
                    </button>
                    <span className="fileAlready">
                        {fileImage && (
                            <img
                                className="fileimgAlready"
                                alt="representImage"
                                src={fileImage}
                            />
                        )}
                    </span>
                </div>
            </div>
            
            <div className="seller-product-div22">
                <div className="seller-product-div2">
                    <div>
                        <h5>노출상품명</h5>
                    </div>
                    <div>
                        <input type="text" className="form-control form-displayName" name='form-displayName' value={formDisplayName} onChange={onClickFormDisplayName} />  
                    </div>
                    <div>
                        <h5>가격 및 재고</h5>
                    </div>
                    <div>
                        <input type="text" className="form-control form-price" name='price' value={price} onChange={onClickPrice} />  
                        <input type="number" className="form-control form-stock" name='stock' value={stock} onChange={onClickStock} />  
                    </div>
                    <div>
                        <h5>유통기한</h5>
                    </div>
                    <div>
                        <DatePicker dateFormat="yyyy/MM/dd" 
                            className="form-control form-displayName"
                            selected={deadline} 
                            onChange={date => setDeadline(date)} 
                        />
                    </div>
                </div>

                <div className="seller-product-div3">
                    <div>
                        <h5>카테고리</h5>
                    </div>
                    <div>
                        <div className="seller-category">
                            <button className="category-sd" onClick={categorySearch}>카테고리 검색</button>
                            <button className="category-sd" onClick={categoryAll}>카테고리 전체</button>
                            <button className="category-sd" onClick={categoryDelete}>카테고리 삭제</button>
                            {displayAllCategory ? 
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
                            : <span></span>}
                        </div>
                        <input type="text" className="form-control form-displayName" name='form-displayName' value={formCategory} onChange={onClickFormCategory} />  
                        <div> 선택된 카테고리 : <span>{selectCategory}</span></div>
                    </div>
                </div>
            </div>
                            
            <div className="seller-product-div4">
                <div style={{marginBottom:"30px"}}>
                    
                    <h5>상세설명</h5>
                </div>
                <div>
                    <button className="category-sd" onClick={sellerDetailImage}>이미지 디테일</button>
                    <button className="category-sd" onClick={sellerDetailTemplate}>템플릿 추천</button>
                </div>
                {templateCheck === false ?

                    <div className = "seller-detail">
                        <div style={{marginTop:"30px"}}>
                            <h5 className="template-title">디테일 이미지 등록</h5>
                        </div>
                        <div className="seller-product-div5">
                            <div>
                                <span>이미지 등록(최대 8개)</span>
                            </div>
                            
                            <input type="file" multiple ref={imageDetailInput} name="imgDetail" accept="image/jpg, image/png, image/jpeg" onChange={saveFileImageDetail} />
                            <button className="seller-product-image-button" onClick={onClickDetailImageUpload}>
                                <span>+</span>
                            </button>
                            
                            <span className="imgDetailAlready">
                                {fileImageDetail && fileImageDetail.map((image, id) => (
                                        <img
                                        src={image}
                                        className="fileimgAlready"
                                        alt= {id}
                                        key = {id}
                                        onClick={() => deleteFileImageDetail(id)}
                                        />
                                    ))}
                            </span>
                        </div>

                        <div className="seller-already-success">
                            <button className="category-sd" onClick={onClickRegisterProduct}>상품등록</button>
                        </div>
                    </div>
                    :
                    <div className = "seller-template">
                        <div>
                            <h5 className="template-title">템플릿추천</h5>
                        </div>
                        <div className="seller-product-div5">
                            <div>
                                <span>이미지 등록(필수 5개)</span>
                            </div>
                            <div>
                                <input type="file" multiple ref={imageTemplateInput} name="imgTemplate" accept="image/jpg, image/png, image/jpeg" onChange={saveFileImageTemplate} />
                                <button className="seller-product-image-button" onClick={onClickTemplateImageUpload}>
                                    <span>+</span>
                                </button>

                                <span className="imgDetailAlready">
                                {fileImageTemplate && fileImageTemplate.map((image, id) => (
                                        <img
                                        src={image}
                                        className="fileimgAlready"
                                        alt= {id}
                                        key = {id}
                                        onClick={() => deleteFileImageTemplate(id)}
                                        />
                                    ))}
                            </span>
                            </div>
                        </div>

                        <div className="seller-product-div5">
                            <div className="seller-template-write">
                                <span>글 등록(필수 6개)</span>
                            </div>

                            <div className="seller-template-flex">
                                <div className="seller-template-block1">
                                    <div className="seller-template-item">
                                        <div className="seller-template-writeButton" >제목</div>
                                        <input type="text" className="form-control seller-title" value={sellerTitle} onChange={onHandlersellerTitle} />  
                                    </div>
                                    <div className="seller-template-item">
                                    <div className="seller-template-writeButton" >제목 상세</div>
                                        <input type="text" className="form-control seller-title" value={sellerTitleDetail} onChange={onHandlersellerTitleDetail} />  
                                    </div>
                                    <div className="seller-template-item">
                                    <div className="seller-template-writeButton" >강조 문구1</div>
                                        <input type="text" className="form-control seller-title" value={sellerTitleHighlight1} onChange={onHandlersellerTitleHighlight1} />  
                                    </div>
                                </div>
                                
                                <div className="seller-template-block2">
                                    <div className="seller-template-item">
                                    <div className="seller-template-writeButton" >강조 문구2</div>
                                        <input type="text" className="form-control seller-title" value={sellerTitleHighlight2} onChange={onHandlersellerTitleHighlight2} />  
                                    </div>
                                    <div className="seller-template-item">
                                    <div className="seller-template-writeButton" >제품 이름</div>
                                        <input type="text" className="form-control seller-title" value={sellerProductName} onChange={onHandlersellerProductName} />  
                                    </div>
                                    <div className="seller-template-item">
                                    <div className="seller-template-writeButton" >제품 설명</div>
                                        <input type="text" className="form-control seller-title" value={sellerProductDetail} onChange={onHandlersellerProductDetail} />  
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="seller-product-div7">
                            <div className="seller-template-write">
                                <span className="already-seing">미리보기</span>
                                {visible &&
                                <div className="already-container">
                                    <div className="already-title">{sellerTitle}</div>
                                    <div className="already-titleDetail">{sellerTitleDetail}</div>
                                    <div className="already-image1">
                                        <img className="seller-template-already-image1" src={fileImageTemplate[0]} alt="image1" />
                                    </div>
                                    <div className="already-highlight">
                                        <div className="already-highlight1">
                                            <span>
                                                <img className="already-icon-highlight" alt="highlight" src={highlight}/>
                                            </span>
                                            &nbsp;{sellerTitleHighlight1}
                                        </div>
                                        <div className="already-highlight2">
                                            <span>
                                                <img className="already-icon-highlight" alt="highlight" src={highlight}/>
                                            </span>
                                            &nbsp;{sellerTitleHighlight2}
                                        </div>
                                    </div>
                                    <div className="already-image2">
                                        <img className="seller-template-already-image2" src={fileImageTemplate[1]} alt="image2" />
                                    </div>
                                    <div className="already-productName">{sellerProductName}</div>
                                    <div className="already-productDetail">{sellerProductDetail}</div>
                                    <div className="already-image3">
                                        <img className="seller-template-already-image3" src={fileImageTemplate[2]} alt="image2" />
                                    </div>
                                    <div className="already-image4">
                                        <img className="seller-template-already-image4" src={fileImageTemplate[3]} alt="image2" />
                                    </div>
                                    <div className="already-image5">
                                        <img className="seller-template-already-image5" src={fileImageTemplate[4]} alt="image2" />
                                    </div>
                                </div>}
                                
                            </div>
                        </div>

                        <div className="seller-already-success">
                            <button className="category-sd-pre" onClick={onClickAlreadyProduct}>미리보기</button>
                            <button className="category-sd" onClick={onClickRegisterProduct}>상품등록</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SellerProductRegister;
