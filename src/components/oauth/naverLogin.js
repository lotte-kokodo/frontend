import {useContext, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {ServerConfigContext} from "../../context/serverConfigProvider";
import LoginLoading from "./loginLoading";

const NaverLogin = () => {

  const location = useLocation();
  const { url } = useContext(ServerConfigContext);
  const navigate = useNavigate();

  useEffect(() => {
    authenticateWithNaver();
  }, []);

  const authenticateWithNaver = async () => {
    console.log(location);

    // 네이버 사용자 정보제공 동의 후 결과로 얻은 Request Params 그대로 서버에 전달
    const api = url + "/member-service/oauth/naver" + location.search;
    await axios.get(api)
    .then((resp) => {
      alert("회원 인증 성공");

      const data = resp.data.result.data;
      localStorage.setItem("memberId", data.memberId);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      navigate("/");
      window.location.reload();
    })
    .catch((err) => {
      alert("회원 인증 실패")
    });
  }

  return (
      <>
        <LoginLoading />
      </>
  );
}

export default NaverLogin;