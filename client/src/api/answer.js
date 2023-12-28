import axios from "./axios";

//export const getAnswersRequest = (id) => axios.get('/Answers',id)
//export const getQuestionRequest = (id) => axios.get(`/questions/${id}`)
export const createAnswersRequest = (answer) => axios.post('/answers', answer)
export const putAnswersRequest = (id,answer) => axios.put(`/answers/${id}`, answer)
export const deleteAnswersRequest = (id) => axios.delete(`/answers/${id}`)
export const refreshListAnswerRequest = (answer) => axios.post('answers-list', answer)