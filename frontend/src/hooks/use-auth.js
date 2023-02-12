import { useBoundStore } from '../stores/useBoundStore'
import { useMutation, useQueryClient } from "react-query"
import { 
  login, 
  logout, 
  signup, 
  resetRequest, 
  resetPassword,
  checkResetToken,
  confirmation
} from "../helpers/users-api"
import toast from 'react-hot-toast'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const setUser = useBoundStore((state) => state.setUser)

  const signinUserMutation = useMutation(login,
    {
      onSuccess: (response) => {
        if (response.data?.message === "Logged in.") {
          localStorage.setItem('isLoggedIn', true)
          toast.success(`Welcome back, ${response.data.data.full_name}`)
          queryClient.invalidateQueries('user') 
        }
      }
    }
  )

  const signupUserMutation = useMutation(signup,
    {
      onSuccess: (response) => {
        console.log('onSuccess called for mutation')
        if (response.data?.message === "Signed up sucessfully."){
          queryClient.invalidateQueries('user') 
        }
      }
    }
  )

  const signoutUserMutation = useMutation(logout, {
    onSuccess: (response) => {
      if (response.data?.message === "Logged out successfully."){
        console.log('success')
        localStorage.removeItem('isLoggedIn')
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

  const resetPasswordMutation = useMutation(resetPassword, {
    onSuccess: () => {
      console.log('success')

    },
    onError: (e) => {
      console.log('error:', e.response.data.errors)
    }
  })

  const checkResetTokenMutation = useMutation(checkResetToken, {
    onSuccess: () => {
      console.log('success')

    },
    onError: (e) => {
      console.log('error:', e.response.data.errors)
    }
  })

  const confirmationMutation = useMutation(confirmation, {
    onSuccess: () => {
      toast.success(`Email confirmed successfully! Please log in to continue.`)
    },
    onError: (e) => {
      toast.error(`An error has occured. Please ensure link has not expired.`)
    }
  })

  return {
    signinUserMutation,
    signupUserMutation,
    signoutUserMutation,
    requestPasswordResetMutation,
    resetPasswordMutation,
    confirmationMutation,
    checkResetTokenMutation
  }
}