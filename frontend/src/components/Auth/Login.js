import { useRef } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { login } from "../../helpers/users-api";
import { useUserContext } from "../../components/UserContext/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const signin = useUserContext().signin;

  const handleLogin = async (userInfo) => {
    const response = await login(userInfo);
    if (response && response.data.data) {
      signin(response);
      navigate("/app/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    handleLogin(userInfo);
    e.target.reset();
  };

  return (
    <div>
      <h3> Login </h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name="email" placeholder="email" required/>
        <br />
        Password:{" "}
        <input type="password" name="password" placeholder="password" required/>
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
export default Login;
