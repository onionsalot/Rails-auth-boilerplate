import { useRef } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { signup } from "../../helpers/users-api";
import { useUserContext } from "../../components/UserContext/UserContext";

const Registration = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const signin = useUserContext().signin;

  const handleRegister = async (userInfo) => {
    const response = await signup(userInfo);
    if (response && response.data.status === "success") {
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
    handleRegister(userInfo);
    e.target.reset();
  };

  return (
    <div>
      <h3> Register </h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name="email" placeholder="email" required/>
        <br />
        Password:{" "}
        <input type="password" name="password" placeholder="password" required/>
        <br />
        Password Confirmation:{" "}
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Registration;
