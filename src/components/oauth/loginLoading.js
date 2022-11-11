import loadingGif from "../../src_assets/login/loading-icon.gif";
import "../../pages/client/member/css/login.css";

const LoginLoading = () => {


  return (
    <div className="login-loading-div">

      <img src={loadingGif} className="login-loading-img"/>

    </div>
  )
}

export default LoginLoading;