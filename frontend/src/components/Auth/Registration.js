import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signup } from "../../helpers/users-api";

const Registration = ({ setUser }) => {
  const navigate = useNavigate();
  const formRef = useRef();
  const register = async (userInfo, setUser) => {
    const response = await signup(userInfo);
    if (response && response.data.status === 'created') {
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
    register(userInfo, setUser);
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
