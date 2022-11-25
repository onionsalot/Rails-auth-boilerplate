import { useStore } from "../stores/userStore";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Cookies from "js-cookie"
// import { useNavigate } from "react-router-dom";
import { 
  login, 
  logout, 
  signup, 
  resetRequest, 
  resetPassword,
  confirmation
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
        if (response.data?.message === "Logged in.") {
          localStorage.setItem('isLoggedIn', true)
          queryClient.invalidateQueries('user') 
        }
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
          queryClient.invalidateQueries('user') 
        }
      },
      onError: (e) => {
        console.log('error:', e.response.data.message)
      }
    }
  )

  const signoutUserMutation = useMutation(logout, {
    onSuccess: (response) => {
      if (response.data?.message === "Logged out successfully."){
        console.log('success')
        localStorage.removeItem('isLoggedIn');
        setUser(null)
        queryClient.invalidateQueries('user')
      }
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

  const confirmationMutation = useMutation(confirmation, {
    onSuccess: () => {
      console.log('success')
    },
    onError: (e) => {
      console.log('error:', e.response.data.errors)
    }
  })


  const getCurrentUserQuery = useQuery('user', getCurrentUser, {
    onSuccess: (response) => {
      console.log('getcurrentuser query called')
      if (response?.data?.message === "Session found.") {
        setUser(response?.data?.data)
      }
    },
    staleTime: 3600000,
    retry: false,
    refetchOnWindowFocus: false,
    onError: (e) => {
      setUser(null);
      localStorage.removeItem('isLoggedIn');
    }
  })

  return {
    signinUserMutation,
    signupUserMutation,
    signoutUserMutation,
    requestPasswordResetMutation,
    resetPasswordMutation,
    getCurrentUserQuery,
    confirmationMutation
  };
};