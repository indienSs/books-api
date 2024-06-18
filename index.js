import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { booksRouter } from "./routes/booksRouter.js";
import { usersRouter } from "./routes/usersRouter.js";

config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", booksRouter);
app.use("/api", usersRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
