import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import questionRoutes from "./routes/question.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subcategoryRoutes from "./routes/subcategory.routes.js";
import examRoutes from "./routes/exam.routes.js";
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/", authRoutes);
app.use("/api", questionRoutes);
app.use("/api", categoryRoutes);
app.use("/api", subcategoryRoutes);
app.use("/api", examRoutes);

//.listen receives a PORT like a integer ej:4000
app.listen(PORT);
