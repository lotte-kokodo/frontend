import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"

import "../css/footer.css"
import logo from '../../../../src_assets/main/footer_logo.png'


function Footer() {



    return (
        <div>
            <footer id="footer" className="footer">
    <div className="footer-menu">
        <div className="frame-sm">
            <ul className="footer-menu-list">
                <li><a href="/etc/footer/company">회사소개</a></li>
                <li><a href="/service/notice">공지사항</a></li>
                <li><a href="/product/storeInquiry">입점 · 제휴 · 광고문의</a></li>
                <li><a href="/etc/footer/uselaw">이용약관</a></li>
                <li><a href="/etc/footer/privacy" className="text-black2 text-md">개인정보처리방침</a></li>
            </ul>
            
        </div>
    </div>
    <div className="footer-info">
        <strong className="footer-logo">
            <img src = {logo} style={{width: "150px", height:"150px", marginTop: "-15px"}}></img><span className="blind">KOKODO</span></strong>
        <div className="colum-info">
            <h5 className="blind">회사 정보</h5>
            <ul className="footer-biz-info">
                <li><span className="company-name">(주)코코도</span></li>
                <li>대표 : 김영문</li>
                <li> | 주소 : 서울특별시 서초구 서초대로74길 33</li>
                <li> | 사업자등록번호 : 105-87-81968
                    <span className="biz-information">
                        <a href="/">사업자정보 확인</a>
                    </span>
                </li>
                <li> | 통신판매업신고번호 : 제2015-서울마포-1058호</li>
                <li> | 개인정보보호책임자 : 김남협</li>
            </ul>
            <p className="copyright">Copyright©KOKODO All rights reserved.</p>
        </div>
        <div className="colum-info">
            <ul className="customer-info">
                <li className="cscenter">고객센터 <em className="footer-tel">02-0000-0000</em></li>
                <li>FAX. 02-0000-0000</li>
                <li>E-mail. kokodo@kokodo.shop</li>
            </ul>
            <div className="customer-btns">
                <a href="#" onClick="footerCheckLogin('/service/voc')"><span>고객의소리</span></a>
                <a href="#" onClick="footerCheckLogin('/mypage/userCounsel/regCouncel')"><span>1:1문의</span></a>
            </div>
            <ul className="footer-sns-list">
                <li><a href="https://www.facebook.com/rankingdakcom" title="" target="_blank"><i className="ico-sns-facebook"></i><span className="blind">페이스북</span></a></li>
                <li><a href="https://www.instagram.com/rankingdak_official" title="" target="_blank"><i className="ico-sns-instagram"></i><span className="blind">인스타그램</span></a></li>
                <li><a href="https://blog.naver.com/rankingdak" title="" target="_blank"><i className="ico-sns-blog"></i><span className="blind">네이버블로그</span></a></li>
                <li><a href="https://post.naver.com/my.nhn?memberNo=9267177" title="" target="_blank"><i className="ico-sns-post"></i><span className="blind">네이버포스트</span></a></li>
                <li><a href="https://pf.kakao.com/_ltFRl" title="" target="_blank"><i className="ico-sns-kakaotalk"></i><span className="blind">카카오톡</span></a></li>
                <li><a href="https://www.youtube.com/c/rankingdakcom" title="" target="_blank"><i className="ico-sns-youtube"></i><span className="blind">유튜브</span></a></li>
            </ul>
        </div>
    </div>
    <div className="footer-bottom">
        <ul className="service-txt">

            <li><a href="/"><i className="ico-footer-service01"></i>정보보호 관리체계 ISMS 인증 획득</a></li>
            <li><a href="/"><i className="ico-footer-service02"></i> 구매 안전 서비스 가입사실 확인</a></li>
        </ul>
    </div>


            </footer>
        </div>
    )
}

export default Footer;