import { createContext, useContext, useState } from "react";
import {
  createQuestionsRequest,
  getQuestionsRequest,
  deleteQuestionsRequest,
  getQuestionRequest,
  putQuestionsRequest,
} from "../api/question.js";
import {
  createAnswersRequest,
  putAnswersRequest,
  deleteAnswersRequest,
  refreshListAnswerRequest,
} from "../api/answer.js";
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

  const createQuestion = async (question) => {
    try {
      const res = await createQuestionsRequest(question);
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

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateQuestion = async (id, question) => {
    try {
    
      await putQuestionsRequest(id, question_data);
    } catch (error) {
      console.error(error);
    }
  };
  const createAnswer = async (answer, id, done) => {
    try {
      const reAnswer = {
        body_answer: answer,
        question_id: id.toString(),
        done: done,
      };
      const res = await createAnswersRequest(reAnswer);
      //console.log(reAnswer)
    } catch (error) {
      console.error(error);
    }
  };
  const updateAnswer = async (id, answer) => {
    try {
      await putAnswersRequest(id, { body_answer: answer });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAnswer = async (id) => {
    try {
      await deleteAnswersRequest(id);
    } catch (error) {
      console.error(error);
    }
  };
  const refreshListAnswer = async (answerList, id) => {
    try {
      const refreshAnswerList = { answers: answerList, id_question: id}
      await refreshListAnswerRequest(refreshAnswerList);
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
        createQuestion,
        getQuestions,
        deleteQuestion,
        getQuestion,
        updateQuestion,
        createAnswer,
        updateAnswer,
        deleteAnswer,
        Active,
        updateForm,
        refreshListAnswer,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
