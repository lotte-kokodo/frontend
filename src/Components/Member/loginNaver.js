// 네이버 로그인 JDK 사용로직
import React, { useEffect } from 'react';

const { naver } = window;

const LoginNaver = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "ed9g7SnNyBjkgeGVe0us",
      callbackUrl: "http://localhost:9090/",
      clientSecret: "5JmXE1WAmu",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'green', type: 3, height: '60' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id='naverIdLogin' />;
};

export default LoginNaver;