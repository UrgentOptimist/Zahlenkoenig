import { useState, useCallback } from 'react';

export interface ArithmeticQuestion {
  num1: number;
  num2: number;
  operation: '+' | '-';
  correct: number;
  options: number[];
}

export interface ArithmeticState {
  questions: ArithmeticQuestion[];
  currentIndex: number;
  score: number;
  answered: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

export const useArithmetic = (difficulty: 'easy' | 'medium' | 'hard' = 'easy') => {
  const generateQuestion = useCallback((): ArithmeticQuestion => {
    let num1, num2, operation: '+' | '-';
    
    if (difficulty === 'easy') {
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
    } else if (difficulty === 'medium') {
      num1 = Math.floor(Math.random() * 15);
      num2 = Math.floor(Math.random() * 15);
    } else {
      num1 = Math.floor(Math.random() * 20);
      num2 = Math.floor(Math.random() * 20);
    }
    
    operation = Math.random() > 0.5 ? '+' : '-';
    
    let correct = operation === '+' ? num1 + num2 : num1 - num2;
    
    // Stelle sicher, dass Subtraktion nicht negativ wird
    if (correct < 0) {
      [num1, num2] = [num2, num1];
      correct = num1 - num2;
    }
    
    // Generiere Optionen
    const options = new Set<number>();
    options.add(correct);
    
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      const option = correct + offset;
      if (option >= 0) {
        options.add(option);
      }
    }
    
    return {
      num1,
      num2,
      operation,
      correct,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    };
  }, [difficulty]);

  const [state, setState] = useState<ArithmeticState>(() => ({
    questions: Array.from({ length: 10 }, () => generateQuestion()),
    currentIndex: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    isCorrect: null
  }));

  const selectAnswer = useCallback((answer: number) => {
    const isCorrect = answer === state.questions[state.currentIndex].correct;
    setState(prev => ({
      ...prev,
      answered: true,
      selectedAnswer: answer,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  }, [state.questions, state.currentIndex]);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex < prev.questions.length - 1) {
        return {
          ...prev,
          currentIndex: prev.currentIndex + 1,
          answered: false,
          selectedAnswer: null,
          isCorrect: null
        };
      }
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      questions: Array.from({ length: 10 }, () => generateQuestion()),
      currentIndex: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      isCorrect: null
    });
  }, [generateQuestion]);

  const isFinished = state.currentIndex === state.questions.length - 1 && state.answered;

  return {
    ...state,
    currentQuestion: state.questions[state.currentIndex],
    selectAnswer,
    nextQuestion,
    reset,
    isFinished,
    progress: {
      current: state.currentIndex + 1,
      total: state.questions.length
    }
  };
};
