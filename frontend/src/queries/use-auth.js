import { useStore } from "../stores/userStore";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Cookies from "js-cookie"
// import { useNavigate } from "react-router-dom";
import { 
  login, 
  logout, 
  signup, 
  resetRequest, 
  resetPassword 
} from "../helpers/users-api";
import { getCurrentUser } from "../helpers/users-api";

export const useAuth = () => {
  // const [user, setUser] = useState(null);
  const queryClient = useQueryClient()
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  // const navigate = useNavigate();

  const signinUserMutation = useMutation(login,
    {
      onSuccess: (response) => {
        console.log('test')
        localStorage.setItem('isLoggedIn', true)
        Cookies.set("_access_token", response.headers["access-token"])
        Cookies.set("_client", response.headers["client"])
        Cookies.set("_uid", response.headers["uid"])
        queryClient.invalidateQueries('user') 
      },
      onError: (e) => {
        console.log('error:', e.response.data.message)
      }
    }
  )

  const signupUserMutation = useMutation(signup,
    {
      onSuccess: (response) => {
        console.log('onSuccess called for mutation')
        if (response.data?.message === "Signed up sucessfully."){
          localStorage.setItem('isLoggedIn', true)
          Cookies.set("_access_token", response.headers["access-token"])
          Cookies.set("_client", response.headers["client"])
          Cookies.set("_uid", response.headers["uid"])
          queryClient.invalidateQueries('user') 
        }
      },
      onError: (e) => {
        console.log('error:', e.response.data.message)
      }
    }
  )

  const signoutUserMutation = useMutation(logout, {
    onSuccess: () => {
      console.log('success')
      localStorage.removeItem('isLoggedIn');
      Cookies.remove("_access_token")
      Cookies.remove("_client")
      Cookies.remove("_uid")
      queryClient.invalidateQueries('user')
      // navigate("/app/dashboard");
    },
    onError: (e) => {
      console.log('error:', e.response.data.errors)
    }
  })

  const requestPasswordResetMutation = useMutation(resetRequest, {
    onSuccess: () => {
      console.log('success')
    },
    onError: (e) => {
      console.log('error:', e.response.data.errors)
    }
  })

  const resetPasswordMutation = useMutation( (payload) => {
    // need to map out the payload as react-query mutations only take one argument
    const { headers, ...passwords} = payload
    resetPassword(passwords, headers)
  }, {
    onSuccess: () => {
      console.log('success')

    },
    onError: (e) => {
      console.log('error:', e.response.data.errors)
    }
  })

  const getCurrentUserQuery = useQuery('user', getCurrentUser, {
    onSuccess: (data) => {
      console.log('getcurrentuser query called')
      if (!!data?.data.data) {
        setUser(data?.data.data)
      } else {
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
      }
    },
    staleTime: 120000,
    onError: (e) => {
      setUser(null);
      localStorage.removeItem('isLoggedIn');
      Cookies.remove("_access_token")
      Cookies.remove("_client")
      Cookies.remove("_uid")
    }
  })

  return {
    signinUserMutation,
    signupUserMutation,
    signoutUserMutation,
    requestPasswordResetMutation,
    resetPasswordMutation,
    getCurrentUserQuery
  };
};