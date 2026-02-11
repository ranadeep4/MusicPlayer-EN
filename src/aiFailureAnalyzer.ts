
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';


export interface AIFailureAnalysis {
  category: string;
  rootCause: string;
  suggestedFix: string;
  confidence: number;
}

const API_KEY = process.env.GEMINI_API_KEY;
const ENDPOINT =
  'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

export async function analyzeTestFailure(
  testName: string,
  errorMessage: string,
  stack?: string
): Promise<AIFailureAnalysis> {
  if (!API_KEY) {
    return {
      category: 'Unknown',
      rootCause: 'Gemini API key not configured',
      suggestedFix: 'Add GEMINI_API_KEY to environment variables',
      confidence: 0
    };
  }

  const prompt = `
Return ONLY raw JSON. No markdown. No explanations.

JSON format:
{
  "category": string,
  "rootCause": string,
  "suggestedFix": string,
  "confidence": number
}

Rules:
- suggestedFix make it understandable and should have < 100 words
- confidence between 0 and 1

Test Name:
${testName}

Error Message:
${errorMessage}

Stack Trace:
${stack ?? 'N/A'}
`;

  try {
    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data: any = await res.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';

    text = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(text);

    return {
      category: parsed.category ?? 'Unknown',
      rootCause: parsed.rootCause ?? 'Unknown',
      suggestedFix: parsed.suggestedFix ?? 'Unknown',
      confidence: Number(parsed.confidence) || 0.5
    };
  } catch (err: any) {
  console.error('🔥 RAW GEMINI ERROR 🔥');
  console.error(err?.message || err);
  console.error(err?.stack);

  return {
    category: 'AIError',
    rootCause: err?.message || 'Gemini request failed',
    suggestedFix: 'See console logs for exact Gemini error',
    confidence: 0
  };
}

}
