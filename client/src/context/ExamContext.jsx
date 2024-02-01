import { createContext, useContext, useState } from "react";
import { createExamRequest, examQuestionRequest, getExamsRequest } from "../api/exam.js";

const ExamContext = createContext();

export const useExams = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExams must be used within a ExamProvider");
  }
  return context;
};

export function ExamProvider({ children }) {
  const [Exams, setExams] = useState([]);
  const [listQuestions, setListQuestions] = useState([]);

  const getExams = async() =>{
    try {
      const res = await getExamsRequest()
      setExams(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  const createExam = async (question) => {
    try {
      const newData = {
        name_exam: question.name_exam,
        body_exam: question.body_exam,
        available_time: Number(question.available_time),
        max_score: Number(question.max_score),
      };
      const res = await createExamRequest(newData);
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const insertQuestionExam = async(question) => {
    try {
      const res = await examQuestionRequest(question)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ExamContext.Provider value={{ createExam, insertQuestionExam, getExams, Exams , listQuestions, setListQuestions}}>
      {children}
    </ExamContext.Provider>
  );
}
