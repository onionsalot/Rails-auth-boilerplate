import axios from "../lib/axios";
import Cookies from "js-cookie"

const BASE_URL = "http://localhost:3000/auth/";

function getHeaders() {
  return {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }
}

export function getCurrentUser() {
  if (!Cookies.get("CSRF-TOKEN")) return
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

export function resetPassword(password, headers) {
  return sendRequest(`${BASE_URL}password`, 'PUT', password, headers)
}

export function resetRequest(userData) {
  return sendRequest(`${BASE_URL}password`, 'POST', userData)
}

async function sendRequest(url, method = 'GET', payload = null, headers = null) {
  let response = null
  console.log('send request called',payload,getHeaders())
  try {
    if (method === 'GET') {
      response = axios.get(url, getHeaders())
    } else if (method === 'POST') {
      response = axios.post(url, payload)
    } else if (method === 'DELETE') {
      response = axios.delete(url, getHeaders())
    } else if (method === 'PUT') {
      response = axios.put(url, payload, headers)
    }
  } catch (error) {
    return error.response
  }
  console.log('userapi response = ', response)
  return response
}