import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../helpers/users-api";
import { useUserContext } from "../../components/UserContext/UserContext";
import { useAuth } from "../../queries/use-auth"
import Cookies from "js-cookie"
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Mutation } from "react-apollo";

const Registration = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const queryClient = useQueryClient()

  // const signin = useUserContext().signin;
  const [errors, setErrors] = useState([])
  const { signupUserMutation } = useAuth()
  // const handleRegister = async (userInfo) => {
  //   const response = await signup(userInfo);
  //   console.log('registration: =>', response)
  //   if (response && response.status === 200) {
  //     // signin(response);
  //     navigate("/app/dashboard");
  //   } else if (response.data.errors.full_messages.length > 0) {
  //     setErrors([...errors, ...response.data.errors.full_messages])
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = { email: data.email, password: data.password, password_confirmation: data.password_confirmation }
    signupUserMutation.mutate(
      userInfo,
      { 
        onSuccess: (response) => {
          console.log('onSuccess called for Registration')
          // queryClient.invalidateQueries('user')
          navigate("/app/dashboard")
        }
      }
    );
    e.target.reset();
  };

  const showErrors = errors.map((e, i) => {
    return <p className="errors" key={i}>{e}</p>
  })

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
      {signupUserMutation.isError ? signupUserMutation.error.response?.data?.message : ""}
    </div>
  );
};
export default Registration;
