import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface GenerateRequest {
  productName: string;
  category: string;
  keyFeatures: string;
  targetCustomer: string;
  priceRange: string;
  platform: string;
  competitorWeakness?: string;
}

export interface GenerateResponse {
  title: string;
  bullets: string[];
  description: string;
  keywords: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();

    const {
      productName,
      category,
      keyFeatures,
      targetCustomer,
      priceRange,
      platform,
      competitorWeakness,
    } = body;

    if (!productName || !category || !keyFeatures || !targetCustomer || !priceRange || !platform) {
      return NextResponse.json(
        { error: "All required fields must be filled in." },
        { status: 400 }
      );
    }

    const competitorSection = competitorWeakness?.trim()
      ? `\n- Competitor Weakness to capitalize on: ${competitorWeakness}`
      : "";

    const prompt = `You are an expert Amazon India and Flipkart listing optimization specialist focused on maximizing conversion rates.

Generate a product listing for:
- Product: ${productName}
- Category: ${category}
- Key Features: ${keyFeatures}
- Target Customer: ${targetCustomer}
- Price Range: ${priceRange}
- Platform: ${platform}${competitorSection}

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "title": "keyword-rich title, max 200 characters, optimized for ${platform} search algorithm",
  "bullets": [
    "KEYWORD – benefit-first bullet point 1",
    "KEYWORD – benefit-first bullet point 2",
    "KEYWORD – benefit-first bullet point 3",
    "KEYWORD – benefit-first bullet point 4",
    "KEYWORD – benefit-first bullet point 5"
  ],
  "description": "Persuasive 120-180 word product description highlighting benefits and use cases",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8", "keyword9", "keyword10"]
}

Strict rules:
1. Title: keyword-rich, max 200 characters, includes brand-style name if fitting
2. Bullets: each starts with ALL CAPS keyword followed by em-dash (–), benefit-first language
3. Description: persuasive, 120–180 words, emotional + functional benefits, no keyword stuffing
4. Keywords: exactly 10 backend search keywords, high-relevance, no repeats from title
5. Use Indian buyer psychology where appropriate: 'value for money', 'trusted quality', 'ideal for gifting', 'BIS certified', 'ISI mark'
6. Make output specific to this exact product — no generic filler
7. Return ONLY the JSON object`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Strip any markdown code fences if present
    const jsonText = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    let parsed: GenerateResponse;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    // Validate structure
    if (
      !parsed.title ||
      !Array.isArray(parsed.bullets) ||
      parsed.bullets.length < 1 ||
      !parsed.description ||
      !Array.isArray(parsed.keywords)
    ) {
      return NextResponse.json(
        { error: "Incomplete response from AI. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Generate API error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
