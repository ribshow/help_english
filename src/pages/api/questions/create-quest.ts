import type { NextApiRequest, NextApiResponse } from "next";
import Question from "@/models/Question";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { question, alternative1, alternative2, alternative3, answer } =
    req.body;

  try {
    const newQuestion = await Question.create({
      question,
      alternative1,
      alternative2,
      alternative3,
      answer,
    });
    res.status(201).json({
      message: "Question created successfully",
      newQuestion,
    });
  } catch (error) {
    console.error(`Error creating question: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
}
