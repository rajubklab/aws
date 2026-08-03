import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { NextResponse } from "next/server";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "ap-south-1",
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const command = new ConverseCommand({
    modelId: process.env.BEDROCK_MODEL_ID!,
    messages: [
      {
        role: "user",
        content: [{ text: message }],
      },
    ],
    inferenceConfig: {
      maxTokens: 300,
      temperature: 0.7,
    },
  });

  const response = await client.send(command);

  const text = response.output?.message?.content?.[0]?.text || "No response";

  return NextResponse.json({ reply: text });
}
