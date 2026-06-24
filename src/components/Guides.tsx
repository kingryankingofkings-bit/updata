// src/components/Guides.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import instructionGuide from '../guides/instruction-docs.md';
import knowledgeGuide from '../guides/knowledge-docs.md';
import trainingGuide from '../guides/ai-training-files.md';

type GuideType = 'instruction' | 'knowledge' | 'training';

interface Props {
  activeGuide: GuideType;
}

const guideMap: Record<GuideType, string> = {
  instruction: instructionGuide,
  knowledge: knowledgeGuide,
  training: trainingGuide,
};

export const Guides: React.FC<Props> = ({ activeGuide }) => {
  const markdown = guideMap[activeGuide];
  return (
    <div className="p-6 overflow-y-auto prose prose-invert max-w-none">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};
