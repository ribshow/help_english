import mongoose from "@/context/dbconfig";

import { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    alternative1: {
      type: String,
      required: true,
    },
    alternative2: {
      type: String,
      required: true,
    },
    alternative3: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
