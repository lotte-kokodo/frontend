import { Star } from "@mui/icons-material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

import "../css/review.css";
import { ServerConfigContext } from "../../../context/serverConfigProvider";

const ARRAY = [0, 1, 2, 3, 4];


export default function Review() {
    const { url } = useContext(ServerConfigContext);
    let { productId } = useParams(null);

    const [totalReview, setTotalReview ]=useState(0);
    const [reviewList, setReviewList ]=useState([]);
    const [reviewContent, setReviewContent] = useState('');

    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const [ rate, setRate] =useState(0);

    const handleStarClick = index => {
      let clickStates = [...clicked];
      for (let i = 0; i < 5; i++) {
        clickStates[i] = i <= index ? true : false;
      }
      setClicked(clickStates);
    };

    const changeReviewContent = (e)=>{
        setReviewContent(e.target.value);
    }
  
    useEffect(() => {
      sendReview();
    }, [clicked]); //컨디마 컨디업
  
    const sendReview = () => {
      let score = clicked.filter(Boolean).length;
      setRate(score);
    };
  
    const saveReview = () =>{

        console.log(productId);
        console.log(reviewContent);
        console.log(rate);

        const fetchData = async () => {

            await axios({
                method: 'post',
                url: url + `/product-service/review`,
                data: {
                    productId: productId,
                    content: reviewContent,
                    rating: rate
                },
                headers: {'memberId' : '1'}
            })
              .then(function (resp) {
                        alert("리뷰 등록 완료");
                        window.location.reload()
    
                })
                .catch(function (error) {
                        console.log(error);
                    })

        }
        fetchData();
    }

    // 리뷰 갯수 & 평균 평점 조회 (Product)
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(url + `/product-service/review/total/${productId}`)
                .then(function (resp) {
                    setTotalReview(resp.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData(productId);
    }, []);

    // 리뷰 조회
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(url + `/product-service/review/${productId}?page=`+0)
                .then(function (resp) {
                    console.log(resp);
                    setReviewList(resp.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData(productId);
    }, []);


    return (
        <div>

            <div className="tabContents"><div data-v-a49b620e id="reviewMain" className="productReviewWrap" style={{width:"1100px"}}>{/**/}
                <div data-v-2d2cca6e data-v-a49b620e className="reviewPanel groupProd summaryExists">
                    <div data-v-12dc8e2a data-v-2d2cca6e className="optionWrap stockOnly block hasImage stockOnly">{/**/}
                    <div data-v-12dc8e2a><div data-v-12dc8e2a className="selectResult">
                       
                    </div>{/**/}{/**/}{/**/}
                </div>{/**/}
            </div>
            <div data-v-2d2cca6e className="util isOptionType">
                <div data-v-2d2cca6e className="sum">
                    <strong data-v-2d2cca6e>리뷰</strong>
                    <span data-v-2d2cca6e>( {totalReview.reviewCnt} )</span>
                </div>
            </div>
            
            <div data-v-2d2cca6e className="cores">
                <div data-v-2d2cca6e className="staring">
                    <span data-v-2d2cca6e className="star">
                        <strong data-v-2d2cca6e style={{ width: '94%' }} />
                        <span data-v-2d2cca6e className="blind">평점</span>
                    </span>
                    <div data-v-2d2cca6e className="score">
                        <em data-v-2d2cca6e>{totalReview.totalRate }</em>
                        <span data-v-2d2cca6e className="total">/ 5</span>
                    </div>
                </div>
            </div>
            
        </div>

        <div style={{padding: "10px"}}>
        <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="50"
              onClick={() => handleStarClick(el)}
              className={clicked[el] && 'yellowStar'}
            />
          );
        })}
      </Stars>
    </Wrap>
                <textarea class="reviewContent"  value={reviewContent} onChange={changeReviewContent} style={{width: "80%", height:"100px", marginRight:"10px", marginLeft:"10px"}}></textarea>
                <button onClick={()=>saveReview()} style={{backgroundColor: "#000", padding : "10px", paddingLeft:"40px", paddingRight:"40px", textAlign:"center", 
                color:"#fff", borderRadius: "10px",verticalAlign: "top"}}>리뷰 등록</button>
        </div>



        <div>
        {
            reviewList.map( function(object){ 
                    return (
                        <div key={object} data-v-05ce94ee data-v-a49b620e className="reviewList">
                        <div data-v-05ce94ee className="uswersAndMoremenu">
                            <div data-v-05ce94ee className="users">
                                <a data-v-05ce94ee href="/p/review/reviewerHome/reviewerHomePage?mbNo=10008574604">
                                    <figure data-v-05ce94ee className="profileImg5">
                                        <span data-v-05ce94ee className="blind">유저 썸네일 이미지</span>
                                    </figure>
                                </a>
                                <div data-v-05ce94ee className="identities">
                                    <div data-v-05ce94ee className="userNameWrap">
                                        <strong data-v-05ce94ee className="userName">{object.memberName}</strong>
                                    </div>
                                <div data-v-05ce94ee className="badges" />
                            </div>
                        </div>
                        </div>
                        <div data-v-05ce94ee className="contents">
                          <div data-v-05ce94ee className="staring">
                             <span data-v-05ce94ee className="star">
                                 <strong data-v-05ce94ee style={{ width: '100%' }} />
                                </span>
                                <span data-v-05ce94ee className="blind">평점</span>
                                <em data-v-05ce94ee>{object.rating}</em>
                            </div>
                        
                            <button data-v-05ce94ee type="button" className="texts">
                                <span data-v-05ce94ee className="texting">{object.content}</span>
                            </button>
                        </div>
                        <div data-v-05ce94ee className="underAction">
                            <span data-v-05ce94ee className="date">DATE</span>
                        </div>
                    </div>
                    )
                })
            }
      </div>

        
        
    
    {/* <div data-v-a49b620e className="paginationArea short">
        <div data-v-68fee7ac data-v-a49b620e className="v-popover tooltipPolicy">
            <div aria-describedby="popover_exscfhl3x4" className="trigger" style={{ display: 'inline-block' }}>
                <button data-v-68fee7ac className="tooltip-target">리뷰 운영정책</button>
            </div> 
        </div>
    </div> */}
</div></div>

        </div>

    )
}


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;
  padding-left: 10px;

  & svg {
    color: #F0F0F0;
    cursor: pointer;
    width:30px;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: #F0F0F0;
    width:30px;
  }

  .yellowStar {
    color: #fcc419;
    width:30px;
  }
`;