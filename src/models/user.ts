import { Schema, model, Document } from "mongoose";

const User = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default model("User", User);

export interface IUser extends Document {
  login: string;
  password: string;
}
