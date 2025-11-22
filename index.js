import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import postRoutes from "./src/routes/post.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import photoRoutes from "./src/routes/photo.routes.js";
import { testConnection } from "./src/config/db.js";
import swaggerSpec from "./src/config/swagger.js";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiVersion = "/api/v1";
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
  },
});

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigin,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(apiVersion, generalLimiter);
app.use(morgan("dev"));

app.use(`${apiVersion}/auth`, authLimiter, authRoutes);
app.use(`${apiVersion}/posts`, postRoutes);
app.use(`${apiVersion}/comments`, commentRoutes);
app.use(`${apiVersion}/users`, userRoutes);
app.use(`${apiVersion}/photos`, photoRoutes);
app.use(`${apiVersion}/photo`, photoRoutes);
app.use("/uploads", express.static("uploads"));
app.use(
  `${apiVersion}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} on http://localhost:${port}`
  );
  testConnection();
});
