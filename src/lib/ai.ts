import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export type AIModel = 'gemini' | 'chatgpt';

export async function generateContent(
  model: AIModel,
  prompt: string,
  systemInstruction?: string
): Promise<string> {
  const geminiKey = localStorage.getItem('geminiKey');
  const openaiKey = localStorage.getItem('openaiKey');

  if (model === 'gemini') {
    if (!geminiKey) throw new Error('Gemini API key not found in Settings.');
    const genAI = new GoogleGenerativeAI(geminiKey);
    // Using gemini-1.5-pro as it's the current powerful model
    const aiModel = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: systemInstruction,
    });
    
    const result = await aiModel.generateContent(prompt);
    return result.response.text();
  } 
  
  if (model === 'chatgpt') {
    if (!openaiKey) throw new Error('OpenAI API key not found in Settings.');
    const openai = new OpenAI({ apiKey: openaiKey, dangerouslyAllowBrowser: true });
    
    const messages: any[] = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // using latest standard model
      messages: messages,
    });
    
    return response.choices[0].message.content || '';
  }

  throw new Error('Unsupported AI model');
}
