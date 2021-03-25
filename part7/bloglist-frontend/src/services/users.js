import axios from 'axios'

const baseUrl = '/api/users'

const listUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const userService = {
  listUsers
}

export default userService
