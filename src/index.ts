import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./auth/auth.routes";
import DBConnection from "./database";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Settings
app.set("port", process.env.PORT || 3000);

// Routes
app.use("/auth", authRouter);

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
