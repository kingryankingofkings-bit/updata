import { useState } from 'react';
import './App.css';
import { Guides } from './components/Guides';
import Settings from './components/Settings';
import { Editor } from './components/Editor';

function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'guides' | 'settings'>('editor');
  const [activeGuide, setActiveGuide] = useState<'instruction' | 'knowledge' | 'training'>('instruction');

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI Doc Writer
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('editor')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'editor' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            ✏️ Editor
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'guides' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            📚 How‑To Guides
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            ⚙️ Settings
          </button>
        </nav>
        <div className="p-4 text-xs text-gray-500 text-center border-t border-gray-700">
          Powered by Gemini & ChatGPT
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-900">
        {/* Editor */}
        {activeTab === 'editor' && (
          <div className="flex-1 w-full h-full">
            <Editor />
          </div>
        )}

        {/* Guides */}
        {activeTab === 'guides' && (
          <>
            <div className="flex border-b border-gray-700 bg-gray-800">
              <button
                onClick={() => setActiveGuide('instruction')}
                className={`px-4 py-2 ${
                  activeGuide === 'instruction' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                📄 Instructions
              </button>
              <button
                onClick={() => setActiveGuide('knowledge')}
                className={`px-4 py-2 ${
                  activeGuide === 'knowledge' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                📚 Knowledge
              </button>
              <button
                onClick={() => setActiveGuide('training')}
                className={`px-4 py-2 ${
                  activeGuide === 'training' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                🤖 Training Files
              </button>
            </div>
            <Guides activeGuide={activeGuide} />
          </>
        )}

        {/* Settings */}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
}

export default App;
