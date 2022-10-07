import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./Review.css";


export default function Review() {

    return (
        <div>

            <div className="tabContents"><div data-v-a49b620e id="reviewMain" className="productReviewWrap">{/**/}
                <div data-v-2d2cca6e data-v-a49b620e className="reviewPanel groupProd summaryExists">
                    <div data-v-12dc8e2a data-v-2d2cca6e className="optionWrap stockOnly block hasImage stockOnly">{/**/}
                    <div data-v-12dc8e2a><div data-v-12dc8e2a className="selectResult">
                       
                    </div>{/**/}{/**/}{/**/}
                </div>{/**/}
            </div>
            <div data-v-2d2cca6e className="util isOptionType">
                <div data-v-2d2cca6e className="sum">
                    <strong data-v-2d2cca6e>리뷰</strong>
                    <span data-v-2d2cca6e>( 3 )</span>
                </div>
                
                <div data-v-225e91e0 data-v-2d2cca6e className="searchAreaWrap">
                    <div data-v-225e91e0 className="searchArea on">
                        <button data-v-225e91e0 type="button" className="btnSearchInner">검색</button>
                        <input data-v-225e91e0 id="search" type="search" placeholder="궁금한 점을 찾아보세요." />
                        <label data-v-225e91e0 htmlFor="search" className="blind">검색하기</label>
                        <button data-v-225e91e0 type="button" className="btnSearchDel">입력 내용 삭제</button>
                    </div>
                </div>
            </div>
            <div data-v-2d2cca6e className="cores">
                <div data-v-2d2cca6e className="staring">
                    <span data-v-2d2cca6e className="star">
                        <strong data-v-2d2cca6e style={{ width: '94%' }} />
                        <span data-v-2d2cca6e className="blind">평점</span>
                    </span>
                <div data-v-2d2cca6e className="score">
                    <em data-v-2d2cca6e>4.7</em>
                    <span data-v-2d2cca6e className="total">/ 5</span>
                </div>
            </div>
            </div>
            <ul data-v-2d2cca6e className="thumbnail">
                    <li data-v-2d2cca6e className>
                        <a data-v-2d2cca6e href="javascript:void(0);">
                            <img data-v-2d2cca6e src="https://contents.lotteon.com/review/ctnts/10429267/P0C266BDEFB80BBB875C76177FF98F4EB5B5ADB5CCBD481FF50898AC231693306/file/dims/resize/150x150/cropcenter/100x100" alt="contents_10429267" className="loaded" />
                            </a>
                    </li>
            </ul>
        </div>
        
        <div data-v-597ad349 data-v-a49b620e className="reviewFilter">
            <div data-v-597ad349 className="info">
                <span data-v-597ad349 className="total"> 총 3건 </span>
                <div data-v-597ad349 className="sort">
                    <button data-v-597ad349 type="button" className>도움돼요순</button>
                    <button data-v-597ad349 type="button" className>랭킹순</button>
                    <button data-v-597ad349 type="button" className="on">최신순</button>
                </div>
                <button data-v-597ad349 type="button" className="btnFilter">
                    <span data-v-597ad349>필터</span>
                    </button>
            </div>
        </div>
        <div data-v-05ce94ee data-v-a49b620e className="reviewList">
            <div data-v-05ce94ee className="uswersAndMoremenu">
                <div data-v-05ce94ee className="users">
                    <a data-v-05ce94ee href="/p/review/reviewerHome/reviewerHomePage?mbNo=10008574604">
                        <figure data-v-05ce94ee className="profileImg5">
                            <span data-v-05ce94ee className="blind">유저 썸네일 이미지</span>
                        </figure>
                    </a>
                <div data-v-05ce94ee className="identities">
                    <div data-v-05ce94ee className="userNameWrap">
                        <strong data-v-05ce94ee className="userName">byun****</strong>
                    </div>
                    <div data-v-05ce94ee className="badges" />
                </div>
            </div>
            <div data-v-05ce94ee className="moreMenuWrap absolute">
                <button data-v-2292bccc className="hasIcon icon sizeMedium alignLeft">
                    <span data-v-2292bccc className="inner">
                        <span data-v-2292bccc className="icon more" />
                        <span data-v-2292bccc className="blind"> 메뉴 더보기</span>
                    </span>
                </button>
            </div>
        </div>
        <div data-v-05ce94ee className="contents">
            <div data-v-05ce94ee className="staring">
                <span data-v-05ce94ee className="star">
                    <strong data-v-05ce94ee style={{ width: '100%' }} />
                </span>
                <span data-v-05ce94ee className="blind">평점</span>
                <em data-v-05ce94ee>5</em>
            </div>
            <div data-v-05ce94ee className="options">옵션 : 빈티지블랙</div>
            <div data-v-05ce94ee className="seller">
                <span data-v-05ce94ee className="sellerTextWrap">
                    <em data-v-05ce94ee> 판매자 : </em>
                    <span data-v-05ce94ee>롯데백화점 프리미엄아울렛광명점</span>
                </span>
            </div>
            <button data-v-05ce94ee type="button" className="texts">
                <span data-v-05ce94ee className="texting">제품 디자인이 엄청 깔끔하고 좋아요<br />마감도 특별히 문제될 부분은 찾이 못했습니다.<br />잘쓰겠습니다.</span>
            </button>
        </div>
        <div data-v-05ce94ee className="underAction">
            <div data-v-05ce94ee className="feedbacks">
                <button data-v-05ce94ee type="button" className="btnHelpful">
                    <span data-v-05ce94ee>도움돼요</span>
                    <span data-v-05ce94ee className="num">0</span>
                </button>
                <button data-v-05ce94ee type="button" className="btnReply">
                    <span data-v-05ce94ee className="blind">댓글</span>
                    <span data-v-05ce94ee className="num">0</span>
                </button>
            </div>
            <span data-v-05ce94ee className="date">2022.09.05</span>
        </div>
    </div>
    <div data-v-05ce94ee data-v-a49b620e className="reviewList">
        <div data-v-05ce94ee className="uswersAndMoremenu">
            <div data-v-05ce94ee className="users">
                <a data-v-05ce94ee href="/p/review/reviewerHome/reviewerHomePage?mbNo=10012422293">
                    <figure data-v-05ce94ee className="profileImg4">
                        <span data-v-05ce94ee className="blind">유저 썸네일 이미지</span>
                    </figure>
                </a>
            <div data-v-05ce94ee className="identities">
                <div data-v-05ce94ee className="userNameWrap">
                    <strong data-v-05ce94ee className="userName">with****</strong>
                </div>
                <div data-v-05ce94ee className="badges" />
            </div>
        </div>
        <div data-v-05ce94ee className="moreMenuWrap absolute">
            <button data-v-2292bccc className="hasIcon icon sizeMedium alignLeft">
                <span data-v-2292bccc className="inner">
                    <span data-v-2292bccc className="icon more" />
                    <span data-v-2292bccc className="blind">
                                메뉴 더보기
                    </span>
                </span>
            </button>
        </div>
    </div>
    <div data-v-05ce94ee className="contents">
        <div data-v-05ce94ee className="staring">
            <span data-v-05ce94ee className="star">
                <strong data-v-05ce94ee style={{ width: '100%' }} />
            </span>
            <span data-v-05ce94ee className="blind">평점</span>
            <em data-v-05ce94ee>5</em>
        </div>
        <div data-v-05ce94ee className="options">옵션 : 메이플</div>
        <div data-v-05ce94ee className="seller">
            <span data-v-05ce94ee className="sellerTextWrap">
                <em data-v-05ce94ee> 판매자 : </em><span data-v-05ce94ee>롯데백화점 프리미엄아울렛광명점</span>
            </span>
        </div>
        <button data-v-05ce94ee type="button" className="texts">
            <span data-v-05ce94ee className="texting">완전 깔끔하고 고급집니다!!</span>
        </button>
        </div>
        <div data-v-05ce94ee className="underAction">
            <div data-v-05ce94ee className="feedbacks">
                <button data-v-05ce94ee type="button" className="btnHelpful">
                    <span data-v-05ce94ee>도움돼요</span>
                <span data-v-05ce94ee className="num">0</span>
                </button>
                <button data-v-05ce94ee type="button" className="btnReply">
                    <span data-v-05ce94ee className="blind">댓글</span>
                    <span data-v-05ce94ee className="num">0</span>
                </button>
            </div>
            <span data-v-05ce94ee className="date">2022.05.10</span>
        </div>
    </div>
    <div data-v-05ce94ee data-v-a49b620e className="reviewList">
        <div data-v-05ce94ee className="uswersAndMoremenu">
            <div data-v-05ce94ee className="users">
                <a data-v-05ce94ee href="/p/review/reviewerHome/reviewerHomePage?mbNo=10014045457">
                <figure data-v-05ce94ee className="profileImg3">
                    <span data-v-05ce94ee className="blind">유저 썸네일 이미지</span>
                </figure>
                </a>
                <div data-v-05ce94ee className="identities">
                    <div data-v-05ce94ee className="userNameWrap">
                        <strong data-v-05ce94ee className="userName">jhj8****</strong>
                    </div>
                    <div data-v-05ce94ee className="badges" /></div>
                </div>
                <div data-v-05ce94ee className="moreMenuWrap absolute">
                    <button data-v-2292bccc className="hasIcon icon sizeMedium alignLeft">
                        <span data-v-2292bccc className="inner">
                            <span data-v-2292bccc className="icon more" />
                            <span data-v-2292bccc className="blind"> 메뉴 더보기</span>
                        </span>
                    </button>
                </div>
            </div>
        <div data-v-05ce94ee className="contents">
            <div data-v-05ce94ee className="staring">
                <span data-v-05ce94ee className="star">
                    <strong data-v-05ce94ee style={{ width: '80%' }} />
                </span>
                <span data-v-05ce94ee className="blind">평점</span>
                <em data-v-05ce94ee>4</em>
            </div>
            <div data-v-05ce94ee className="options">옵션 : 화이트</div>
            <div data-v-05ce94ee className="seller">
                <span data-v-05ce94ee className="sellerTextWrap">
                    <em data-v-05ce94ee> 판매자 : </em>
                    <span data-v-05ce94ee>롯데백화점 프리미엄아울렛광명점</span>
                </span>
            </div>
            <button data-v-05ce94ee type="button" className="texts">
                <span data-v-05ce94ee className="texting">배송이 우선 많이 느리고 화이트인데 완전 화이트가 아니라 아이보리 색입니다</span>
            </button>
            <ul data-v-05ce94ee className="photoshoot">
                <li data-v-05ce94ee className>
                    <a data-v-05ce94ee>
                        <img data-v-05ce94ee src="https://contents.lotteon.com/review/ctnts/10429267/P0C266BDEFB80BBB875C76177FF98F4EB5B5ADB5CCBD481FF50898AC231693306/file/dims/resize/96x96/cropcenter/64x64" alt="contents_10429267" className="loaded" />
                    </a>
                </li>
            </ul>
        </div>
        <div data-v-05ce94ee className="underAction">
            <div data-v-05ce94ee className="feedbacks">
                <button data-v-05ce94ee type="button" className="btnHelpful">
                    <span data-v-05ce94ee>도움돼요</span>
                <span data-v-05ce94ee className="num">0</span>
                </button>
                <button data-v-05ce94ee type="button" className="btnReply">
                    <span data-v-05ce94ee className="blind">댓글</span><span data-v-05ce94ee className="num">0</span>
                </button>
            </div>
            <span data-v-05ce94ee className="date">2022.02.25</span>
        </div>
    </div>
    <div data-v-a49b620e className="paginationArea short">
        <div data-v-68fee7ac data-v-a49b620e className="v-popover tooltipPolicy">
            <div aria-describedby="popover_exscfhl3x4" className="trigger" style={{ display: 'inline-block' }}>
                <button data-v-68fee7ac className="tooltip-target">리뷰 운영정책</button>
            </div> 
        </div>
    </div>
</div></div>

        </div>

    )
}