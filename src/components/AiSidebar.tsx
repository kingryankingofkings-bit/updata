import React, { useState } from 'react';
import { generateContent, AIModel } from '../lib/ai';

interface Props {
  editorContent: string;
  onUpdateContent: (newContent: string) => void;
}

export const AiSidebar: React.FC<Props> = ({ editorContent, onUpdateContent }) => {
  const [model, setModel] = useState<AIModel>('gemini');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (systemInstruction: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Send the current editor content plus the user prompt
      const fullPrompt = `Current Document Content:\n${editorContent}\n\nUser Request: ${prompt}`;
      const response = await generateContent(model, fullPrompt, systemInstruction);
      
      // Append the AI response to the editor content
      onUpdateContent(editorContent + '\n\n' + response);
      setPrompt('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-80 border-l border-gray-700 bg-gray-800 flex flex-col h-full">
      <div className="p-4 border-b border-gray-700 font-semibold text-gray-200">
        ✨ AI Assistant
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <label className="block text-sm font-medium mb-2 text-gray-400">Select AI Model</label>
        <select 
          value={model}
          onChange={(e) => setModel(e.target.value as AIModel)}
          className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded p-2 mb-6 focus:outline-none focus:border-blue-500"
        >
          <option value="gemini">Google Gemini 1.5 Pro</option>
          <option value="chatgpt">OpenAI ChatGPT (GPT-4o)</option>
        </select>

        <label className="block text-sm font-medium mb-2 text-gray-400">What do you need help with?</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-32 bg-gray-900 border border-gray-700 text-gray-200 rounded p-2 mb-4 resize-none focus:outline-none focus:border-blue-500"
          placeholder="e.g., 'Expand the first section', 'Write a step-by-step tutorial on...', or 'Format this as a table'"
        />

        {error && <div className="text-red-400 text-sm mb-4 bg-red-900/20 p-2 rounded">{error}</div>}

        <div className="space-y-3">
          <button
            onClick={() => handleGenerate("You are an expert technical writer. Assist the user with their document. Output only the requested text without pleasantries.")}
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded p-2 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate / Edit'}
          </button>
          
          {/* Quick Actions based on Expert Directives */}
          <div className="pt-4 border-t border-gray-700">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Expert Directives</span>
            <button
              onClick={() => {
                setPrompt("Summarize the current document and extract the key takeaways.");
                handleGenerate("You are an expert editor. Provide a concise summary and bulleted key takeaways based on the provided document.");
              }}
              disabled={isLoading}
              className="w-full text-left text-sm px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors mb-2"
            >
              📝 Summarize Document
            </button>
            <button
              onClick={() => {
                setPrompt("Fix spelling and grammar errors, and improve the professional tone of the document.");
                handleGenerate("You are an expert copywriter. Rewrite the provided document to fix any spelling or grammar issues, and ensure a highly professional and clear tone.");
              }}
              disabled={isLoading}
              className="w-full text-left text-sm px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
            >
              🪄 Polish & Proofread
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
