import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ArithmeticMode from '@/components/ArithmeticMode';
import NumbersMode from '@/components/NumbersMode';
import ClockMode from '@/components/ClockMode';

type GameMode = null | 'arithmetic' | 'numbers' | 'clock';

/**
 * Design: Warm & Accessible für Senioren
 * - Große, klare Schriften (Poppins)
 * - Warme Farben (Orange, Blau, Grün)
 * - Große, touchfreundliche Buttons (mindestens 60x60px)
 * - Viel Whitespace und klare Hierarchie
 * - Motivierende Nachrichten und Symbole
 */
export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>(null);

  if (gameMode === 'arithmetic') {
    return <ArithmeticMode onBack={() => setGameMode(null)} />;
  }

  if (gameMode === 'numbers') {
    return <NumbersMode onBack={() => setGameMode(null)} />;
  }

  if (gameMode === 'clock') {
    return <ClockMode onBack={() => setGameMode(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-5xl md:text-7xl font-bold text-primary">
            👑 Zahlenkönig
          </h1>
          <p className="text-2xl md:text-3xl text-foreground font-semibold">
            Trainiere dein Gehirn mit Spaß!
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Wähle einen Trainingsmodus aus und beginne dein Abenteuer
          </p>
        </div>

        {/* Trainingsmodi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Rechnen */}
          <Card className="card-senior flex flex-col items-center justify-center space-y-6 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setGameMode('arithmetic')}>
            <div className="text-7xl md:text-8xl">🧮</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Rechnen</h2>
            <p className="text-lg md:text-xl text-foreground text-center">
              Trainiere Addition und Subtraktion mit einfachen Aufgaben
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setGameMode('arithmetic');
              }}
              className="btn-senior-primary text-2xl w-full"
            >
              Starten →
            </Button>
          </Card>

          {/* Zahlen */}
          <Card className="card-senior flex flex-col items-center justify-center space-y-6 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setGameMode('numbers')}>
            <div className="text-7xl md:text-8xl">🔢</div>
            <h2 className="text-3xl md:text-4xl font-bold text-accent">Zahlen</h2>
            <p className="text-lg md:text-xl text-foreground text-center">
              Erkenne Zahlen, Zähle Symbole und ergänze Reihen
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setGameMode('numbers');
              }}
              className="btn-senior-success text-2xl w-full"
            >
              Starten →
            </Button>
          </Card>

          {/* Uhrzeit */}
          <Card className="card-senior flex flex-col items-center justify-center space-y-6 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setGameMode('clock')}>
            <div className="text-7xl md:text-8xl">⏰</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Uhrzeit</h2>
            <p className="text-lg md:text-xl text-foreground text-center">
              Lerne, die Uhr zu lesen - analog und digital
            </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setGameMode('clock');
              }}
              className="btn-senior-primary text-2xl w-full"
            >
              Starten →
            </Button>
          </Card>
        </div>

        {/* Tipps und Informationen */}
        <Card className="card-senior space-y-4 p-6 md:p-8 bg-gradient-to-r from-blue-50 to-green-50">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">💡 Tipps zum Trainieren</h3>
          <ul className="space-y-3 text-lg md:text-xl text-foreground">
            <li>✓ Trainiere regelmäßig für beste Ergebnisse</li>
            <li>✓ Es gibt keine Zeitbegrenzung - trainiere in deinem Tempo</li>
            <li>✓ Jede richtige Antwort bringt dir einen Punkt</li>
            <li>✓ Du kannst jederzeit zurück zum Menü gehen</li>
          </ul>
        </Card>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-lg pb-8">
          <p>🏥 Eine App für Senioren nach Schlaganfall</p>
          <p className="text-sm mt-2">Trainiere in deinem eigenen Tempo und feiere deine Erfolge!</p>
        </div>
      </div>
    </div>
  );
}
