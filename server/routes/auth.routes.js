import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
  changePasswordFromPerfil,
  deleteUser,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.schema.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.post(
  "/change_password",
  authRequired,
  validateSchema(changePasswordSchema),
  changePasswordFromPerfil
);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);
router.delete("/user", authRequired, deleteUser);

export default router;
