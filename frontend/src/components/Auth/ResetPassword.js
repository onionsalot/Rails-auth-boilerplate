import { useRef, useState, useEffect, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../helpers/users-api";
import { useAuth } from "../../queries/use-auth"

const ResetPassword = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { resetPasswordMutation, checkResetTokenMutation } = useAuth()
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token')

  useEffect(() => {
    checkResetTokenMutation.mutate({reset_password_token: token})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    if (data.password !== data.confirmPassword) setErrors(["Passwords are not the same"])

    const payload = {
      user: {
        password: data.password, 
        password_confirmation: data.confirmPassword, 
        reset_password_token: token
      }
    };

    resetPasswordMutation.mutate(
      payload,
      { 
        onSuccess: (response) => {
          setMessage("Password has been reset. You will be re-directed in 5 seconds...")
          setTimeout(() => {
            navigate("/app/login")
          }, 5000);
        },
        onError: () => {
          setMessage("An error has occured...")
        }
      }
    )
    e.target.reset()
  };


  return (
    <>
      { checkResetTokenMutation.isSuccess
      ? <div>
          <h3> Login </h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            Password: <input type="password" name="password" placeholder="password" required/>
            <br />
            Confirm Password: <input type="password" name="confirmPassword" placeholder="confirm password" required/>
            <br />
            <input type="submit" value="Reset Password" />
          </form>
          {errors}
          {resetPasswordMutation.isError ? resetPasswordMutation.error : ""}
        </div>
      : <div>
          <p>Invalid Token</p>
        </div>
      }
    </>
  );
};
export default ResetPassword;
