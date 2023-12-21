import { z } from "zod";
export const createExamSchema = z.object({
  name_exam: z.string({ required_error: "Name exam is required" }),
  body_exam: z.string({ required_error: "Body is required" }),
  available_time: z.number({ required_error: "Body is required" }),
  max_score: z.number({ required_error: "Body is required" }),
});

export const examQuestionSchema = z.object({
  question_score: z.number({ required_error: "question_score is required" }),
  id_question: z.number({ required_error: "Id question not valid" }),
  id_exam: z.number({ required_error: "Id exam not valid"}),
});


export const examUserResolvedSchema = z.object({
    user_score: z.number({ required_error: "User score is required" }),
    resolved_time: z.number({ required_error: "time is not valid" }),
    id_exam: z.number({ required_error: "Id exam not valid" }),
  });