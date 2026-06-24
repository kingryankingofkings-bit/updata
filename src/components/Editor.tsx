import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { AiSidebar } from './AiSidebar';

export const Editor: React.FC = () => {
  const [content, setContent] = useState<string>('# New Document\n\nStart writing your instruction or knowledge document here...');

  return (
    <div className="flex h-full w-full">
      {/* Editor Pane */}
      <div className="flex-1 flex flex-col border-r border-gray-700 bg-gray-900">
        <div className="p-2 border-b border-gray-700 bg-gray-800 text-sm text-gray-400">
          Markdown Editor
        </div>
        <textarea
          className="flex-1 w-full bg-transparent text-gray-100 p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          spellCheck={false}
        />
      </div>

      {/* Preview Pane */}
      <div className="flex-1 flex flex-col border-r border-gray-700 bg-gray-900">
        <div className="p-2 border-b border-gray-700 bg-gray-800 text-sm text-gray-400">
          Live Preview
        </div>
        <div className="flex-1 p-6 overflow-y-auto prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <AiSidebar editorContent={content} onUpdateContent={setContent} />
    </div>
  );
};
