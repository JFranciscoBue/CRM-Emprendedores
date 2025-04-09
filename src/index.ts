import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Settings
app.set("port", process.env.PORT || 3000);

// Inizialization
app.listen(app.get("port"), () => {
  console.log("Server listening on port: " + app.get("port"));
});
