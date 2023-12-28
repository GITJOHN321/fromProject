import axios from "./axios";

export const getExamsRequest = () => axios.get('/exams')
export const getExamRequest = (id) => axios.get(`/exams/${id}`)
export const putExamRequest = (id,question) => axios.put(`/exams/${id}`, question)
export const deleteExamRequest= (id) => axios.delete(`/exams/${id}`)
export const createExamRequest = (question) => axios.post('/exams', question)

export const examQuestionRequest = (question) => axios.post('/exams_questions', question)
export const examUserRequest = (question) => axios.post(`/exams_user_resolved`, question)