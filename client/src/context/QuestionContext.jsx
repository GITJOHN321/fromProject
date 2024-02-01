import { createContext, useContext, useState } from "react";
import {
  getQuestionsRequest,
  deleteQuestionsRequest,
  getQuestionRequest,
  putQuestionsRequest,
  createQuestionRequest,
} from "../api/question.js";


const QuestionContext = createContext();

export const useQuestions = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionProvider");
  }
  return context;
};

export function QuestionProvider({ children }) {
  const [Questions, setQuestions] = useState([]);
  const [Question, setQuestion] = useState({});
  const [Active, setActive] = useState(false);

  const updateForm = () => {
    setActive(!Active);
  };
  /* const createQuestion = async (question) => {
    try {
      const res = await createQuestionsRequest(question);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };*/

  const createQuestionWithAnswer = async (question) => {
    try {
      const res = await createQuestionRequest(question);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getQuestions = async () => {
    try {
      const res = await getQuestionsRequest();
      console.log(res.data);
      setQuestions(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteQuestion = async (id) => {
    try {
      const res = await deleteQuestionsRequest(id);
      if (res.status == 204)
        setQuestions(
          Questions.filter((question) => question.id_question != id)
        );
    } catch (error) {
      console.error(error);
    }
  };
  const getQuestion = async (id) => {
    try {
      const res = await getQuestionRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateQuestion = async (id, question) => {
    try {
      await putQuestionsRequest(id, question);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <QuestionContext.Provider
      value={{
        Questions,
        Question,
        setQuestion,
        setActive,
        getQuestions,
        deleteQuestion,
        getQuestion,
        updateQuestion,
        Active,
        updateForm,
        createQuestionWithAnswer,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
