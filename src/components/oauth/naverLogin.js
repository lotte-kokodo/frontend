import {useContext, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {ServerConfigContext} from "../../context/serverConfigProvider";

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
      localStorage.setItem("memberId", resp.data.result.data.memberId);
      localStorage.setItem("accessToken", resp.data.result.data.accessToken);
      localStorage.setItem("refreshToken", resp.data.result.data.refreshToken);

      if(localStorage.getItem("accessToken") !== null || localStorage.getItem("accessToken") !== ""){
        alert("로그인에 성공했습니다.");
        navigate("/");
        window.location.reload();
      }
      else {
        alert("로그인에 실패했습니다. 관리자에게 문의하세요.");
      }
    })
    .catch((err) => {
      alert("아이디와 비밀번호를 확인하세요.");
      console.log(err);
    });
  }

}

export default NaverLogin;