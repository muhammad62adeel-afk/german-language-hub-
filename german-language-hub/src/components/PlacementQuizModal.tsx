import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { GermanLevel } from '../types';

interface PlacementQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedLevel: (level: GermanLevel) => void;
}

export const PlacementQuizModal: React.FC<PlacementQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedLevel,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  if (!isOpen) return null;

  const questions = [
    {
      question: 'How much German have you studied before?',
      options: [
        { text: 'None at all (Absolute zero beginner)', points: 0 },
        { text: 'Know basic words (Guten Tag, Danke, numbers, colors)', points: 1 },
        { text: 'Can form simple sentences and hold brief conversations', points: 2 },
        { text: 'Can comfortably speak in past and present tenses', points: 3 },
      ],
    },
    {
      question: 'Can you introduce yourself and talk about your daily routine in German?',
      options: [
        { text: 'No, I cannot formulate German sentences yet', points: 0 },
        { text: 'Only basic details (Mein Name ist..., Ich komme aus...)', points: 1 },
        { text: 'Yes, with moderate confidence and simple vocabulary', points: 2 },
        { text: 'Easily, including what I did yesterday and plans for tomorrow', points: 3 },
      ],
    },
    {
      question: 'What is your immediate goal in Germany?',
      options: [
        { text: 'Spouse Visa (A1) or starting from scratch for future studies', points: 0 },
        { text: 'General communication preparation before moving to Germany', points: 1 },
        { text: 'Ausbildung (Apprenticeship) or Bachelor degree foundation (B1)', points: 2 },
        { text: 'Direct IT / Engineering Job, Nursing, or German-taught Master (B2)', points: 3 },
      ],
    },
  ];

  const handleSelectOption = (points: number) => {
    const updated = [...answers, points];
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Results step
    }
  };

  const calculateResult = (): { level: GermanLevel; description: string } => {
    const total = answers.reduce((acc, curr) => acc + curr, 0);
    if (total <= 1) {
      return {
        level: 'A1',
        description: 'You should start with Level A1 (Beginner). Building your phonics, grammar foundation, and core vocabulary from scratch will give you the strongest possible start.',
      };
    } else if (total <= 3) {
      return {
        level: 'A2',
        description: 'You already possess beginner awareness. Level A2 (Elementary) is recommended to unlock fluent past tense discussions, daily chores, and travel interactions.',
      };
    } else if (total <= 6) {
      return {
        level: 'B1',
        description: 'Level B1 (Intermediate) is your best match! This is the most crucial level for German Embassy spouse visas, Ausbildung applications, and daily independence in Germany.',
      };
    } else {
      return {
        level: 'B2',
        description: 'Level B2 (Upper Intermediate) will give you the professional polish needed for corporate employment, medical licensing, and university studies.',
      };
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
  };

  const isCompleted = currentStep >= questions.length;
  const result = isCompleted ? calculateResult() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                60-Second Level Finder
              </span>
              <span className="text-xs font-semibold text-stone-400">
                Question {currentStep + 1} of {questions.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-red-600 h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-stone-950 mb-5">
              {questions[currentStep].question}
            </h3>

            <div className="space-y-3">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.points)}
                  className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all font-medium text-xs sm:text-sm text-stone-800 flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          result && (
            <div className="text-center py-2 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Your Recommended Placement
              </span>

              <h3 className="text-3xl font-black text-stone-950 mt-1">
                German Level <span className="text-red-600">{result.level}</span>
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                {result.description}
              </p>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => {
                    onSelectRecommendedLevel(result.level);
                    onClose();
                  }}
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-stone-950 text-white hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Register for Level {result.level}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 font-medium py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
