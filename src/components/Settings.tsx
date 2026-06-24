import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setGeminiKey(localStorage.getItem('geminiKey') || '');
    setOpenaiKey(localStorage.getItem('openaiKey') || '');
  }, []);

  const save = () => {
    localStorage.setItem('geminiKey', geminiKey);
    localStorage.setItem('openaiKey', openaiKey);
    setSaveMessage('API keys saved securely to local storage.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">API Settings</h2>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <label className="block text-sm font-medium mb-2">Google Gemini API Key</label>
        <input
          type="password"
          value={geminiKey}
          onChange={(e) => setGeminiKey(e.target.value)}
          className="w-full p-2 bg-gray-900 border border-gray-600 text-gray-100 rounded focus:border-blue-500 focus:outline-none transition-colors"
          placeholder="AIzaSy..."
        />
        <p className="text-xs text-gray-400 mt-2">Required for Gemini 1.5 Pro features.</p>
      </div>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <label className="block text-sm font-medium mb-2">OpenAI API Key</label>
        <input
          type="password"
          value={openaiKey}
          onChange={(e) => setOpenaiKey(e.target.value)}
          className="w-full p-2 bg-gray-900 border border-gray-600 text-gray-100 rounded focus:border-blue-500 focus:outline-none transition-colors"
          placeholder="sk-..."
        />
        <p className="text-xs text-gray-400 mt-2">Required for ChatGPT (GPT-4o) features.</p>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={save}
          className="px-6 py-2 bg-blue-600 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-lg"
        >
          Save Keys
        </button>
        {saveMessage && <span className="text-green-400 text-sm">{saveMessage}</span>}
      </div>
    </div>
  );
};

export default Settings;
