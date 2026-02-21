import { useState, useCallback } from 'react';

export interface NumberQuestion {
  type: 'recognize' | 'sequence' | 'count';
  number: number;
  options: number[];
  correct: number;
}

export interface NumberState {
  questions: NumberQuestion[];
  currentIndex: number;
  score: number;
  answered: boolean;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

export const useNumbers = () => {
  const generateQuestion = useCallback((): NumberQuestion => {
    const type = (['recognize', 'sequence', 'count'] as const)[Math.floor(Math.random() * 3)];
    
    if (type === 'recognize') {
      // Zahlerkennung: Welche Zahl ist das?
      const number = Math.floor(Math.random() * 10);
      const options = new Set<number>();
      options.add(number);
      
      while (options.size < 4) {
        const option = Math.floor(Math.random() * 10);
        options.add(option);
      }
      
      return {
        type,
        number,
        correct: number,
        options: Array.from(options).sort(() => Math.random() - 0.5)
      };
    } else if (type === 'sequence') {
      // Zahlenreihe: Welche Zahl kommt als nächstes?
      const start = Math.floor(Math.random() * 5);
      const number = start + 3;
      const options = new Set<number>();
      options.add(number);
      
      while (options.size < 4) {
        const option = Math.floor(Math.random() * 10);
        options.add(option);
      }
      
      return {
        type,
        number: start,
        correct: number,
        options: Array.from(options).sort(() => Math.random() - 0.5)
      };
    } else {
      // Zählen: Wie viele Symbole?
      const number = Math.floor(Math.random() * 10) + 1;
      const options = new Set<number>();
      options.add(number);
      
      while (options.size < 4) {
        const option = Math.floor(Math.random() * 10) + 1;
        options.add(option);
      }
      
      return {
        type,
        number,
        correct: number,
        options: Array.from(options).sort(() => Math.random() - 0.5)
      };
    }
  }, []);

  const [state, setState] = useState<NumberState>(() => ({
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
