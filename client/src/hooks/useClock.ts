import { useState, useCallback } from 'react';

export interface ClockQuestion {
  type: 'read-analog' | 'read-digital' | 'time-of-day';
  hours: number;
  minutes: number;
  options: string[];
  correct: string;
}

export interface ClockState {
  questions: ClockQuestion[];
  currentIndex: number;
  score: number;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

const formatTime = (hours: number, minutes: number): string => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const getTimeOfDay = (hours: number): string => {
  if (hours >= 5 && hours < 12) return 'Morgens';
  if (hours >= 12 && hours < 17) return 'Nachmittags';
  if (hours >= 17 && hours < 21) return 'Abends';
  return 'Nachts';
};

export const useClock = () => {
  const generateQuestion = useCallback((): ClockQuestion => {
    const type = (['read-analog', 'read-digital', 'time-of-day'] as const)[Math.floor(Math.random() * 3)];
    
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
    
    if (type === 'read-analog' || type === 'read-digital') {
      // Digitale oder analoge Uhr lesen
      const correct = formatTime(hours, minutes);
      const options = new Set<string>();
      options.add(correct);
      
      while (options.size < 4) {
        const randHours = Math.floor(Math.random() * 24);
        const randMinutes = Math.floor(Math.random() * 4) * 15;
        options.add(formatTime(randHours, randMinutes));
      }
      
      return {
        type,
        hours,
        minutes,
        correct,
        options: Array.from(options).sort(() => Math.random() - 0.5)
      };
    } else {
      // Tageszeit erkennen
      const correct = getTimeOfDay(hours);
      const options = ['Morgens', 'Nachmittags', 'Abends', 'Nachts']
        .sort(() => Math.random() - 0.5);
      
      return {
        type,
        hours,
        minutes: 0,
        correct,
        options
      };
    }
  }, []);

  const [state, setState] = useState<ClockState>(() => ({
    questions: Array.from({ length: 10 }, () => generateQuestion()),
    currentIndex: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    isCorrect: null
  }));

  const selectAnswer = useCallback((answer: string) => {
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
