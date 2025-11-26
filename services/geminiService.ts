import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { getTutorSystemInstruction } from '../constants';
import { Language } from '../types';

// Initialize the Gemini client
const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing from environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const createChatSession = (language: Language): Chat => {
  const ai = getAiClient();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getTutorSystemInstruction(language),
      temperature: 0.3, // Keep it precise for Abhidharma
    },
  });
};

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });
    return result.text || "I pondered this, but no answer arose. Please try again.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "An error occurred while consulting the archives. Please try again.";
  }
};

export const analyzeScenario = async (scenario: string): Promise<string> => {
  const ai = getAiClient();
  const prompt = `
    Analyze the following scenario based on Theravada Abhidharma. 
    Identify the predominant Cittas (Consciousness) and Cetasikas (Mental Factors) likely arising.
    Identify the Object (Arammana).
    
    Scenario: "${scenario}"
    
    Format the output as a concise breakdown using Markdown bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Could not analyze scenario.";
  } catch (error) {
    console.error("Analysis Error:", error);
    return "Analysis failed due to connection error.";
  }
};