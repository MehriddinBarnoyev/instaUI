import axios from "axios"

// Check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem("token")
  return !!token
}

// Get the current user's token
export const getToken = () => {
  return localStorage.getItem("token")
}

// Logout function
export const logout = () => {
  localStorage.removeItem("token")
}

// Add auth header to requests
export const authHeader = () => {
  const token = getToken()

  if (token) {
    return { Authorization: `Bearer ${token}` }
  } else {
    return {}
  }
}

const API_URL = 'http://localhost:5000/api'

// Login function
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, 
      { username, password }, // data should be passed here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const data = response.data // axios avtomatik ravishda JSON'ni parse qiladi

    console.log(data, "auth data");
    
    // Store token
    localStorage.setItem("token", data.token)
    localStorage.setItem("userId", data.user.id)
    
    return data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

// Register function
export const registerUser = async (userData: { name: string; username: string; email: string; password: string }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/register",
      userData, // data should be passed here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const data = response.data

    console.log(data);
    
    // Store token
    localStorage.setItem("token", data.token)

    localStorage.setItem("userId", data.user.id)
    console.log(data);
    
    return data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed")
  }
}
