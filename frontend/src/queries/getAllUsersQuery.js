import axios from "../lib/axios";
const API_URL = `http://localhost:3000/graphql`;

export const getAllUsersQuery = async () => {
  const users = axios({
    url: API_URL,
    method: 'POST',
    data: {
      query: `
        query AllUsers {
          users {
            id
            fullName
          }
        }
      `
    }
  })
  return users;
}