import { useNumbers } from '@/hooks/useNumbers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface NumbersModeProps {
  onBack: () => void;
}

export default function NumbersMode({ onBack }: NumbersModeProps) {
  const numbers = useNumbers();

  if (numbers.isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col items-center justify-center p-4">
        <Card className="card-senior w-full max-w-2xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-accent">
              🎉 Glückwunsch!
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-foreground">
              Du hast {numbers.score} von {numbers.progress.total} Aufgaben richtig gelöst!
            </p>
            <div className="flex gap-4 flex-col md:flex-row justify-center">
              <Button
                onClick={() => numbers.reset()}
                className="btn-senior-success text-2xl"
              >
                <RotateCcw className="mr-2" size={32} />
                Nochmal spielen
              </Button>
              <Button
                onClick={onBack}
                className="btn-senior-secondary text-2xl"
              >
                Zurück zum Menü
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const { currentQuestion } = numbers;

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'recognize':
        return (
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              Welche Zahl ist das?
            </p>
            <div className="text-8xl md:text-9xl font-bold text-secondary">
              {currentQuestion.number}
            </div>
          </div>
        );
      case 'sequence':
        return (
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              Welche Zahl kommt als nächstes?
            </p>
            <div className="text-6xl md:text-7xl font-bold text-secondary space-y-2">
              <div>{currentQuestion.number}</div>
              <div className="text-4xl">↓</div>
              <div className="text-5xl text-muted-foreground">?</div>
            </div>
          </div>
        );
      case 'count':
        return (
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              Wie viele Symbole siehst du?
            </p>
            <div className="text-8xl flex flex-wrap justify-center gap-4">
              {Array.from({ length: currentQuestion.number }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header mit Fortschritt */}
        <div className="flex justify-between items-center">
          <Button
            onClick={onBack}
            variant="outline"
            className="text-lg"
          >
            ← Zurück
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-accent">🔢 Zahlen</h1>
          <div className="text-2xl font-bold text-secondary">
            {numbers.score}/{numbers.progress.total}
          </div>
        </div>

        {/* Fortschrittsbalken */}
        <div className="space-y-2">
          <div className="text-xl font-semibold text-foreground">
            Aufgabe {numbers.progress.current} von {numbers.progress.total}
          </div>
          <Progress
            value={(numbers.progress.current / numbers.progress.total) * 100}
            className="h-4"
          />
        </div>

        {/* Aufgabe */}
        <Card className="card-senior w-full">
          <div className="text-center space-y-8">
            {renderQuestion()}

            {/* Antwortoptionen */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => !numbers.answered && numbers.selectAnswer(option)}
                  disabled={numbers.answered}
                  className={`btn-senior text-3xl md:text-4xl h-24 md:h-32 ${
                    numbers.answered
                      ? option === currentQuestion.correct
                        ? 'bg-accent text-accent-foreground'
                        : option === numbers.selectedAnswer
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-muted text-muted-foreground'
                      : 'btn-senior-success'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {numbers.answered && (
              <div className="space-y-4">
                {numbers.isCorrect ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle size={48} className="text-accent" />
                    <span className="text-3xl font-bold text-accent">Richtig!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <XCircle size={48} className="text-destructive" />
                    <span className="text-3xl font-bold text-destructive">
                      Leider falsch. Die richtige Antwort ist {currentQuestion.correct}.
                    </span>
                  </div>
                )}

                {/* Weiter-Button */}
                <Button
                  onClick={() => numbers.nextQuestion()}
                  disabled={numbers.isFinished}
                  className="btn-senior-success text-2xl w-full"
                >
                  {numbers.isFinished ? 'Fertig!' : 'Weiter →'}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
