import type { NextApiRequest, NextApiResponse } from "next";
import genAI from "@/lib/gemini";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { prompt } = req.body;

  const validPrompt = `Seu nome é o The Helper English. Responda a entrada a seguir de forma técnica mas como se fosse uma pessoa, sem formatação Markdown, nem marcadores com asteriscos, ou símbolos. Quando fizeram alguma pergunta ou pedido relacionado ao Inglês, seja específico e dê uma atenção especial a pergunta. Seja objetivo e evite frases como "sou um modelo de linguagem". entrada: ${prompt}
`;

  try {
    const model = genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: validPrompt,
      config: {
        candidateCount: 1,
        maxOutputTokens: 1000,
      },
    });

    const response = await model;

    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];

      if (
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts.length > 0 &&
        candidate.content.parts[0].text
      ) {
        const text = candidate.content.parts[0].text;
        // Remove leading newlines and trim the response
        const responseText = text; //.replace(/^\s*\n/gm, "").trim();
        res.status(200).json({ response: responseText });
      }
    } else {
      res.status(200).json({ message: "No response available" });
    }
  } catch (error) {
    console.error(`Error in Gemini API: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}
