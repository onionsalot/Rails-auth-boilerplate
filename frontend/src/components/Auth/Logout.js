import Cookies from "js-cookie"
import { useUserContext } from "../../components/UserContext/UserContext";
import { logout } from "../../helpers/users-api";
import { useAuth } from "../../mutations/use-auth"
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Logout = () => {
  const { signout } = useAuth()
  const navigate = useNavigate();
  const [errors, setErrors] = useState([])
  const { signoutUserMutation } = useAuth()

  // const logoutUserMutation = useMutation(logout, {
  //   onSuccess: () => {
  //     console.log('success')
  //     signout()
  //     navigate("/app/dashboard");
  //   },
  //   onError: (e) => {
  //     setErrors([...errors, ...e.response.data.errors])
  //     console.log('error', e)
  //   }
  // })

  // const signout = useUserContext().signout;
  const handleClick = async (e) => {
    e.preventDefault();
    signoutUserMutation.mutate()
  }

  return (
    <div>
      <input type="button" value="Logout" onClick={handleClick} />
    </div>
  )
};

export default Logout;
