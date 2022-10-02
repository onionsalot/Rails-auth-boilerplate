import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signup } from "../../helpers/users-api";
import { useUserContext } from "../../components/UserContext/UserContext";

const Registration = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const signin = useUserContext().signin;

  const handleRegister = async (userInfo) => {
    const response = await signup(userInfo);
    if (response && response.data.status === "created") {
      signin(response.data.user);
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
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name="email" placeholder="email" />
        <br />
        Password:{" "}
        <input type="password" name="password" placeholder="password" />
        <br />
        Password Confirmation:{" "}
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Registration;
