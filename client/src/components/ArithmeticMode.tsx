import { useArithmetic } from '@/hooks/useArithmetic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ArithmeticModeProps {
  onBack: () => void;
}

export default function ArithmeticMode({ onBack }: ArithmeticModeProps) {
  const arithmetic = useArithmetic('easy');

  if (arithmetic.isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 flex flex-col items-center justify-center p-4">
        <Card className="card-senior w-full max-w-2xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              🎉 Glückwunsch!
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-foreground">
              Du hast {arithmetic.score} von {arithmetic.progress.total} Aufgaben richtig gelöst!
            </p>
            <div className="flex gap-4 flex-col md:flex-row justify-center">
              <Button
                onClick={() => arithmetic.reset()}
                className="btn-senior-primary text-2xl"
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

  const { currentQuestion } = arithmetic;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50 p-4 md:p-8">
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
          <h1 className="text-3xl md:text-4xl font-bold text-primary">🧮 Rechnen</h1>
          <div className="text-2xl font-bold text-secondary">
            {arithmetic.score}/{arithmetic.progress.total}
          </div>
        </div>

        {/* Fortschrittsbalken */}
        <div className="space-y-2">
          <div className="text-xl font-semibold text-foreground">
            Aufgabe {arithmetic.progress.current} von {arithmetic.progress.total}
          </div>
          <Progress
            value={(arithmetic.progress.current / arithmetic.progress.total) * 100}
            className="h-4"
          />
        </div>

        {/* Aufgabe */}
        <Card className="card-senior w-full">
          <div className="text-center space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold text-primary">
              {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2}
            </h2>

            {/* Antwortoptionen */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => !arithmetic.answered && arithmetic.selectAnswer(option)}
                  disabled={arithmetic.answered}
                  className={`btn-senior text-3xl md:text-4xl h-24 md:h-32 ${
                    arithmetic.answered
                      ? option === currentQuestion.correct
                        ? 'bg-accent text-accent-foreground'
                        : option === arithmetic.selectedAnswer
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-muted text-muted-foreground'
                      : 'btn-senior-primary'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {arithmetic.answered && (
              <div className="space-y-4">
                {arithmetic.isCorrect ? (
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
                  onClick={() => arithmetic.nextQuestion()}
                  disabled={arithmetic.isFinished}
                  className="btn-senior-primary text-2xl w-full"
                >
                  {arithmetic.isFinished ? 'Fertig!' : 'Weiter →'}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
