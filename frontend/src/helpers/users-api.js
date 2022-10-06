import axios from "axios";
import Cookies from "js-cookie"

const BASE_URL = "http://localhost:3000/auth/";

function headers() {
  return {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  }
}

export function getCurrentUser() {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return sendRequest(`${BASE_URL}sessions`)
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

async function sendRequest(url, method = 'GET', payload = null) {
  let response = null
  console.log('send request called')
  try {
    if (method === 'GET') {
      response = await axios.get(url, headers())
    } else if (method === 'POST') {
      response = await axios.post(url, payload.user, { withCredentials: true })
    } else if (method === 'DELETE') {
      response = await axios.delete(url, headers())
    }
  } catch (error) {
    console.log("error", error);
  }
  console.log('userapi response = ', response)
  return response
}