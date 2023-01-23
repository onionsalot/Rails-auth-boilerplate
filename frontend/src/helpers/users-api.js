import axios from "../lib/axios";
import Cookies from "js-cookie"

const BASE_URL = "http://localhost:3000/auth/";

// function getHeaders() {
//   return {
//     headers: {
//       "access-token": Cookies.get("_access_token"),
//       "client": Cookies.get("_client"),
//       "uid": Cookies.get("_uid")
//     }
//   }
// }

export function getCurrentUser() {
  // console.log(Cookies.get("remember_user_token"))
  // if (!Cookies.get("remember_user_token")) return
  if (localStorage.getItem('isLoggedIn') !== 'true') return null
  return sendRequest(`${BASE_URL}current_user/index`)
};

export function signup(userData) {
  return sendRequest(`${BASE_URL}`, 'POST', userData)
} 

export function login(credentials) {
  return sendRequest(`${BASE_URL}sign_in`, 'POST', credentials)
}

export function logout() {
  return sendRequest(`${BASE_URL}sign_out`, 'DELETE')
}

export function resetPassword(payload) {
  return sendRequest(`${BASE_URL}password`, 'PUT', payload)
}

export function resetRequest(userData) {
  return sendRequest(`${BASE_URL}password`, 'POST', userData)
}

export function checkResetToken(token) {
  return sendRequest(`${BASE_URL}password/check_token`, 'POST', token)
}

export function confirmation(token) {
  return sendRequest(`${BASE_URL}confirmation`, 'GET', null, token)
}

async function sendRequest(url, method = 'GET', payload = null, headers = null) {
  let response = null
  console.log('send request called',payload)
  try {
    if (method === 'GET') {
      response = axios.get(url, headers)
    } else if (method === 'POST') {
      response = axios.post(url, payload)
    } else if (method === 'DELETE') {
      response = axios.delete(url)
    } else if (method === 'PUT') {
      response = axios.put(url, payload, headers)
    }
  } catch (error) {
    return error.response
  }
  console.log('userapi response = ', response)
  return response
}