import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"

import "../css/footer.css"
import logo from '../../../../src_assets/main/footer_logo.png'


function Footer() {



    return (
        <div>
            <footer id="footer" class="footer">
    <div class="footer-menu">
        <div class="frame-sm">
            <ul class="footer-menu-list">
                <li><a href="/etc/footer/company">회사소개</a></li>
                <li><a href="/service/notice">공지사항</a></li>
                <li><a href="/product/storeInquiry">입점 · 제휴 · 광고문의</a></li>
                <li><a href="/etc/footer/uselaw">이용약관</a></li>
                <li><a href="/etc/footer/privacy" class="text-black2 text-md">개인정보처리방침</a></li>
            </ul>
            
        </div>
    </div>
    <div class="footer-info">
        <strong class="footer-logo">
            <img src = {logo} style={{width: "150px", height:"150px", marginTop: "-15px"}}></img><span class="blind">KOKODO</span></strong>
        <div class="colum-info">
            <h5 class="blind">회사 정보</h5>
            <ul class="footer-biz-info">
                <li><span class="company-name">(주)코코도</span></li>
                <li>대표 : 김영문</li>
                <li> | 주소 : 서울특별시 서초구 서초대로74길 33</li>
                <li> | 사업자등록번호 : 105-87-81968
                    <span class="biz-information">
                        <a href="javascript:bizPop();">사업자정보 확인</a>
                    </span>
                </li>
                <li> | 통신판매업신고번호 : 제2015-서울마포-1058호</li>
                <li> | 개인정보보호책임자 : 김남협</li>
            </ul>
            <p class="copyright">Copyright©KOKODO All rights reserved.</p>
        </div>
        <div class="colum-info">
            <ul class="customer-info">
                <li class="cscenter">고객센터 <em class="footer-tel">02-0000-0000</em></li>
                <li>FAX. 02-0000-0000</li>
                <li>E-mail. kokodo@kokodo.shop</li>
            </ul>
            <div class="customer-btns">
                <a href="#" onclick="footerCheckLogin('/service/voc')"><span>고객의소리</span></a>
                <a href="#" onclick="footerCheckLogin('/mypage/userCounsel/regCouncel')"><span>1:1문의</span></a>
            </div>
            <ul class="footer-sns-list">
                <li><a href="https://www.facebook.com/rankingdakcom" title="" target="_blank"><i class="ico-sns-facebook"></i><span class="blind">페이스북</span></a></li>
                <li><a href="https://www.instagram.com/rankingdak_official" title="" target="_blank"><i class="ico-sns-instagram"></i><span class="blind">인스타그램</span></a></li>
                <li><a href="https://blog.naver.com/rankingdak" title="" target="_blank"><i class="ico-sns-blog"></i><span class="blind">네이버블로그</span></a></li>
                <li><a href="https://post.naver.com/my.nhn?memberNo=9267177" title="" target="_blank"><i class="ico-sns-post"></i><span class="blind">네이버포스트</span></a></li>
                <li><a href="https://pf.kakao.com/_ltFRl" title="" target="_blank"><i class="ico-sns-kakaotalk"></i><span class="blind">카카오톡</span></a></li>
                <li><a href="https://www.youtube.com/c/rankingdakcom" title="" target="_blank"><i class="ico-sns-youtube"></i><span class="blind">유튜브</span></a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <ul class="service-txt">

            <li><a href="javascript:ismsPop();"><i class="ico-footer-service01"></i>정보보호 관리체계 ISMS 인증 획득</a></li>
            <li><a href="javascript:bankPop();"><i class="ico-footer-service02"></i> 구매 안전 서비스 가입사실 확인</a></li>
        </ul>
    </div>


            </footer>
        </div>
    )
}

export default Footer;