import React, {useRef, useState} from "react"
import axios from 'axios';

import "../css/sellerProductRegister.css"

function SellerProductRegister() {
    // useRef를 이용해 input태그에 접근한다.
    const imageInput = useRef();
    const imageDetailInput = useRef();
    const imageTemplateInput = useRef();

    // 노출 상품명
    const [formDisplayName, setFormDisplayName] = useState('');

    // 카테고리 찾기, 삭제 버튼
    const [formCategory, setFormCategory] = useState("");
    const [displayCategory, setDisplayCategory] = useState("");
    const [selectCategory, setSelectCategory] = useState("");
    
    const onClickFormCategory = (e) => {
        setFormCategory(e.target.value);
    }

    const categorySearch = () => {
        fetchCategorySearch(formCategory)
    }

    const categoryDelete = () => {
        setSelectCategory("");
    }

    const categorySelect = () => {
        setSelectCategory(displayCategory);
        setFormCategory("");
        setDisplayCategory("");
    }

    const fetchCategorySearch = async (categorySearch) => {
        await axios({
            method: "get",
            url: "http://localhost:9270/category/categoryName/" + categorySearch
        })
        .then(function(response){
            setDisplayCategory(response.data.result.data[0].name);
            console.log(response.data.result.data[0].name);
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
    const [sellerTitleHighklight1, setSellerTitleHighklight1 ] = useState('');
    const [sellerTitleHighklight2, setSellerTitleHighklight2 ] = useState('');
    const [sellerProductName, setSellerProductName ] = useState('');
    const [sellerProductDeatil, setSellerProductDeatil ] = useState('');

    /* 대표 이미지 미리보기 url 생성 */

    // 대표 이미지 url 저장해줄 state
    const [fileImage, sestFileImage] = useState("");

    // 대표 이미지 파일 저장
    const saveFileImage = (e) => {
        sestFileImage(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);
        console.log(fileImage);
    }

    // 대표 이미지 파일 삭제
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        sestFileImage("");
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

    const onHandlersellerTitle = (e) => {
        setSellerTitle(e.target.value);
    };

    const onHandlersellerTitleDetail = (e) => {
        setSelerTitleDetail(e.target.value);
    };

    const onHandlersellerTitleHighlight1 = (e) => {
        setSellerTitleHighklight1(e.target.value);
    };

    const onHandlersellerTitleHighlight2 = (e) => {
        setSellerTitleHighklight2(e.target.value);
    };

    const onHandlersellerProductName = (e) => {
        setSellerProductName(e.target.value);
    };

    const onHandlersellerProductDeatil = (e) => {
        setSellerProductDeatil(e.target.value);
    };

    // Template 저장인지 아닌지 확인
    const sellerDetailImage = () => {
        setTemplateCheck(false);
    }

    const sellerDetailTemplate = () => {
        setTemplateCheck(true);
    }

    // 미리보기 버튼
    const onClickAlreadyProduct = () => {
        
    }

    // 상품 등록
    const onClickRegisterProduct = () => {
        if(templateCheck === true) {

        }else {

        }
    }

    return (
        <div className="seller-product-container">

            <div className="seller-product-resgister">
                <h5>상품등록</h5>
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
                                onClick={() => deleteFileImage()}
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
                </div>

                <div className="seller-product-div3">
                    <div>
                        <h5>카테고리</h5>
                    </div>
                    <div>
                        <div className="seller-category">
                            <button className="category-sd" onClick={categorySearch}>카테고리 검색</button>
                            <button className="category-sd" onClick={categoryDelete}>카테고리 삭제</button>
                        </div>
                        <input type="text" className="form-control form-displayName" name='form-displayName' value={formCategory} onChange={onClickFormCategory} />  
                        <button className="category-select" onClick={categorySelect}>{displayCategory}</button>
                        <div> 선택된 카테고리 : <span>{selectCategory}</span></div>
                    </div>
                </div>
            </div>
                            
            <div className="seller-product-div4">
                <div>
                    <h5>상세설명</h5>
                </div>
                <div>
                    <button className="category-sd" onClick={sellerDetailImage}>이미지 디테일</button>
                    <button className="category-sd" onClick={sellerDetailTemplate}>템플릿 추천</button>
                </div>
                {templateCheck === false ?

                    <div className = "seller-detail">
                        <div>
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
                                        <input type="text" className="form-control seller-title" value={sellerTitleHighklight1} onChange={onHandlersellerTitleHighlight1} />  
                                    </div>
                                </div>
                                
                                <div className="seller-template-block2">
                                    <div className="seller-template-item">
                                    <div className="seller-template-writeButton" >강조 문구2</div>
                                        <input type="text" className="form-control seller-title" value={sellerTitleHighklight2} onChange={onHandlersellerTitleHighlight2} />  
                                    </div>
                                    <div className="seller-template-item">
                                    <div className="seller-template-writeButton" >제품 이름</div>
                                        <input type="text" className="form-control seller-title" value={sellerProductName} onChange={onHandlersellerProductName} />  
                                    </div>
                                    <div className="seller-template-item">
                                    <div className="seller-template-writeButton" >제품 설명</div>
                                        <input type="text" className="form-control seller-title" value={sellerProductDeatil} onChange={onHandlersellerProductDeatil} />  
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="seller-product-div7">
                            <div className="seller-template-write">
                                <span>미리보기</span>

                                <div className="already-container">
                                    <div className="already-title">제목</div>
                                    <div className="already-titleDetail">제목 상세</div>
                                    <div className="already-image1">이미지1</div>
                                    <div className="already-highlight">
                                        <div className="already-highlight1">강조문구1</div>
                                        <div className="already-highlight2">강조문구2</div>
                                    </div>
                                    <div className="already-image2">이미지2</div>
                                    <div className="already-productName">제품이름</div>
                                    <div className="already-productDetail">제품상세</div>
                                    <div className="already-image3">이미지3</div>
                                    <div className="already-image4">이미지4</div>
                                    <div className="already-image5">이미지5</div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="seller-already-success">
                            <button className="category-sd" onClick={onClickAlreadyProduct}>미리보기</button>
                            <button className="category-sd" onClick={onClickRegisterProduct}>상품등록</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SellerProductRegister;