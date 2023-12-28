import { createContext, useContext, useState } from "react";
import { createExamRequest } from "../api/exam.js";

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

  return (
    <ExamContext.Provider value={{ createExam }}>
      {children}
    </ExamContext.Provider>
  );
}
