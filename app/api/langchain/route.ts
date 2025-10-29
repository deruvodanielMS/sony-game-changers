import { NextRequest, NextResponse } from 'next/server'
//import { OpenAI } from "langchain/llms/openai";

export async function POST(req: NextRequest) {
  /*
  try {
    const { prompt } = await req.json();

    const model = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    });

    const response = await model.invoke(prompt);

    return NextResponse.json({ result: response });
  } catch (error) {
    console.error("LangChain Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
    */
  return NextResponse.json({ result: req })
}
