import axios from "./axios"

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify') 

export const verifyTokenEmailRequest = (emailToken) => axios.get(`/verifyEmail/${emailToken}`) 

export const changePasswordFromPerfil = data => axios.post('/change_password', data) 

export const deleteUser = () => axios.delete('/user') 