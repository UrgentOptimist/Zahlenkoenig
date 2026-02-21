import { useClock } from '@/hooks/useClock';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ClockModeProps {
  onBack: () => void;
}

const AnalogClock = ({ hours, minutes }: { hours: number; minutes: number }) => {
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;

  return (
    <div className="flex justify-center">
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-primary bg-white shadow-lg">
        {/* Ziffern */}
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 50 + 35 * Math.cos(angle);
          const y = 50 + 35 * Math.sin(angle);
          return (
            <div
              key={num}
              className="absolute text-2xl md:text-3xl font-bold text-primary"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {num}
            </div>
          );
        })}

        {/* Mittelpunkt */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />

        {/* Stundenzeiger */}
        <div
          className="absolute top-1/2 left-1/2 w-2 h-20 md:h-28 bg-primary rounded-full origin-bottom transform -translate-x-1/2 -translate-y-full"
          style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}
        />

        {/* Minutenzeiger */}
        <div
          className="absolute top-1/2 left-1/2 w-1.5 h-24 md:h-32 bg-secondary rounded-full origin-bottom transform -translate-x-1/2 -translate-y-full"
          style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}
        />
      </div>
    </div>
  );
};

export default function ClockMode({ onBack }: ClockModeProps) {
  const clock = useClock();

  if (clock.isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 flex flex-col items-center justify-center p-4">
        <Card className="card-senior w-full max-w-2xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              🎉 Glückwunsch!
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-foreground">
              Du hast {clock.score} von {clock.progress.total} Aufgaben richtig gelöst!
            </p>
            <div className="flex gap-4 flex-col md:flex-row justify-center">
              <Button
                onClick={() => clock.reset()}
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

  const { currentQuestion } = clock;

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'read-analog':
        return (
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              Welche Zeit zeigt die Uhr?
            </p>
            <AnalogClock hours={currentQuestion.hours} minutes={currentQuestion.minutes} />
          </div>
        );
      case 'read-digital':
        return (
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              Welche Zeit ist das?
            </p>
            <div className="text-8xl md:text-9xl font-bold text-secondary font-mono">
              {String(currentQuestion.hours).padStart(2, '0')}:{String(currentQuestion.minutes).padStart(2, '0')}
            </div>
          </div>
        );
      case 'time-of-day':
        return (
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              Welche Tageszeit ist es um {String(currentQuestion.hours).padStart(2, '0')}:00 Uhr?
            </p>
            <div className="text-6xl">
              {currentQuestion.hours >= 5 && currentQuestion.hours < 12 && '🌅'}
              {currentQuestion.hours >= 12 && currentQuestion.hours < 17 && '☀️'}
              {currentQuestion.hours >= 17 && currentQuestion.hours < 21 && '🌆'}
              {(currentQuestion.hours < 5 || currentQuestion.hours >= 21) && '🌙'}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 p-4 md:p-8">
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
          <h1 className="text-3xl md:text-4xl font-bold text-primary">⏰ Uhrzeit</h1>
          <div className="text-2xl font-bold text-secondary">
            {clock.score}/{clock.progress.total}
          </div>
        </div>

        {/* Fortschrittsbalken */}
        <div className="space-y-2">
          <div className="text-xl font-semibold text-foreground">
            Aufgabe {clock.progress.current} von {clock.progress.total}
          </div>
          <Progress
            value={(clock.progress.current / clock.progress.total) * 100}
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
                  onClick={() => !clock.answered && clock.selectAnswer(option)}
                  disabled={clock.answered}
                  className={`btn-senior text-xl md:text-2xl h-20 md:h-28 ${
                    clock.answered
                      ? option === currentQuestion.correct
                        ? 'bg-accent text-accent-foreground'
                        : option === clock.selectedAnswer
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
            {clock.answered && (
              <div className="space-y-4">
                {clock.isCorrect ? (
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
                  onClick={() => clock.nextQuestion()}
                  disabled={clock.isFinished}
                  className="btn-senior-primary text-2xl w-full"
                >
                  {clock.isFinished ? 'Fertig!' : 'Weiter →'}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
