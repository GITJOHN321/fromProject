import { Router } from "express";
import {
  getExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
  getUserResolvedExam,
  insertQuestionInExam,
  createUserResolved,
} from "../controllers/exam.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.schema.js";
import {
  createExamSchema,
  examQuestionSchema,
  examUserResolvedSchema,
} from "../schemas/exam.schema.js";

const router = Router();

router.get("/exams", authRequired, getExams);
router.get("/exams/:id", authRequired, getExam);
router.put("/exams/:id", authRequired, updateExam);
router.delete("/exams/:id", authRequired, deleteExam);
router.post(
  "/exams",
  authRequired,
  validateSchema(createExamSchema),
  createExam
);
router.post(
  "/exams_questions",
  authRequired,
  validateSchema(examQuestionSchema),
  insertQuestionInExam
);
router.post(
  "/exams_user_resolved",
  authRequired,
  validateSchema(examUserResolvedSchema),
  createUserResolved
);
router.get("/exams_user_resolved", authRequired, getUserResolvedExam);

export default router;
