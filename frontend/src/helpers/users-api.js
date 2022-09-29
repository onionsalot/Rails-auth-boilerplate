import axios from "axios";

const BASE_URL = "http://localhost:3000";

export function getCurrentUser() {
  return sendRequest(`${BASE_URL}/logged_in`)
};

export function signup(userData) {
  return sendRequest(`${BASE_URL}/registrations`, 'POST', userData)
} 

export function login(credentials) {
  return sendRequest(`${BASE_URL}/sessions`, 'POST', credentials)
}

export function logout() {
  return sendRequest(`${BASE_URL}/logout`, 'DELETE')
}

async function sendRequest(url, method = 'GET', payload = null) {
  let response = null
  try {
    if (method === 'GET') {
      response = await axios.get(url, { withCredentials: true })
    } else if (method === 'POST') {
      response = await axios.post(url, payload, { withCredentials: true })
    } else if (method === 'DELETE') {
      response = await axios.delete(url, { withCredentials: true })
    }
  } catch (error) {
    console.log("error", error);
  }
  console.log('userapi response = ', response)
  return response
}