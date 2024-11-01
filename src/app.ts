import { log } from "console";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import session from "express-session";
import mongoose from "mongoose";
import { createClient } from "redis";
import connectRedis from "connect-redis";
export const client = createClient();

const RedisStore = new connectRedis({
  client,
});

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    store: RedisStore,
    secret: process.env.SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use("/api", router);
const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL || "")
      .then(() => {
        console.log("Db connected");
      })
      .catch((error) => {
        console.log("Db error", error);
      });
    client.on("connect", () => {
      console.log("Connected to Redis");
    });
    client.on("error", (err) => {
      console.error("Redis error:", err);
    });
    await client.connect();

    app.listen(process.env.PORT, () => {
      log("Server started on port:", process.env.PORT);
    });
  } catch (error) {
    log(error);
  }
};

start();
