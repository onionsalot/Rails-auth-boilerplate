import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../helpers/users-api";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const formRef = useRef();
  const signIn = async (userInfo, setUser) => {
    const response = await login(userInfo);
    if (response && response.data.logged_in) {
      setUser(response.data.user);
      navigate("/app/dashboard");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    signIn(userInfo, setUser);
    e.target.reset();
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name="email" placeholder="email" />
        <br />
        Password:{" "}
        <input type="password" name="password" placeholder="password" />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
export default Login;
