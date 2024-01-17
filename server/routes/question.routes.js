import { Router } from "express";
import {
  getQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion,
  createQuestion,
  createQuestionWithAnswer
} from "../controllers/question.controller.js";
import {authRequired} from "../middlewares/validateToken.js"
import { validateSchema} from "../middlewares/validator.schema.js"
import { createQuestionSchema } from "../schemas/question.schema.js";

const router = Router()

router.get("/questions", authRequired, getQuestions)
router.get("/questions/:id", authRequired, getQuestion)
router.put("/questions/:id", authRequired, updateQuestion)
router.delete("/questions/:id", authRequired, deleteQuestion)
router.post("/questions", authRequired,validateSchema(createQuestionSchema), createQuestion)
router.post("/questionss", authRequired, createQuestionWithAnswer)
export default router


