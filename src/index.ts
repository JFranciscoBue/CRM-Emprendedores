import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./auth/auth.routes";
import clientsRouter from "./clients/clients.routes";
import projectsRouter from "./projects/projects.routes";
import usersRouter from "./users/users.routes";
import DBConnection from "./database";
import { config as envConfig } from "dotenv";
import tokenValidation from "./middlewares/authorization/token";

envConfig({ path: ".env" });

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Settings
app.set("port", process.env.PORT || 3000);

// Routes
app.use("/auth", authRouter);
app.use("/clients", tokenValidation, clientsRouter);
app.use("/projects", tokenValidation, projectsRouter);
app.use("/users", usersRouter);

// Initialization

DBConnection()
  .then(() => {
    console.log("Database Online");
  })
  .catch((e) => {
    console.error(e);
    console.log("Cannot Connect Database");
  })
  .finally(() => {
    app.listen(app.get("port"), () => {
      console.log("Server listening on port: " + app.get("port"));
    });
  });
