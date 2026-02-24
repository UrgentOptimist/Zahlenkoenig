# Zahlenkönig - Trainings-App für Senioren

![Zahlenkönig Logo](https://raw.githubusercontent.com/UrgentOptimist/Zahlenkoenig/main/logo.png)

## Über die App

**Zahlenkönig** ist eine speziell entwickelte Progressive Web App (PWA), die darauf abzielt, Senioren nach einem leichten Schlaganfall beim Training grundlegender kognitiver Fähigkeiten zu unterstützen. Die App konzentriert sich auf das einfache Rechnen, das Erkennen von Zahlen und das Lesen der Uhr, um die geistige Fitness auf spielerische und motivierende Weise zu fördern.

## Hauptfunktionen und Spielmodi

Die App bietet drei interaktive Spielmodi, die auf die Bedürfnisse der Zielgruppe zugeschnitten sind:

1.  **Rechnen:** Training von Addition und Subtraktion im Zahlenraum von 0 bis 20.
2.  **Zahlen:** Übungen zur Zahlenerkennung, zum Zählen von Symbolen und zum Vervollständigen von Zahlenreihen.
3.  **Uhrzeit:** Erlernen und Festigen des Ablesens von analogen und digitalen Uhren sowie des Erkennens von Tageszeiten.

## Seniorengerechtes Design

Bei der Entwicklung des Zahlenkönigs wurde größter Wert auf eine seniorengerechte Gestaltung gelegt:

*   **Große Schriften:** Verwendung der Schriftart Poppins mit Schriftgrößen von 18px bis 48px für optimale Lesbarkeit.
*   **Große Buttons:** Interaktive Elemente sind mindestens 60x60px groß, um eine einfache Bedienung zu gewährleisten.
*   **Warme Farben:** Eine beruhigende Farbpalette aus Orange, Blau und Grün schafft eine angenehme Benutzerumgebung.
*   **Hoher Kontrast:** Das Design erfüllt die WCAG 2.1 AA-Standards für Barrierefreiheit, um eine gute Sichtbarkeit für alle Nutzer zu gewährleisten.

## Technische Details

Zahlenkönig ist als Progressive Web App (PWA) konzipiert und bietet volle Offline-Funktionalität dank Service Worker-Technologie. Dies ermöglicht den Nutzern, die App auch ohne aktive Internetverbindung zu verwenden.

Die App basiert auf modernen Webtechnologien:

*   **Frontend:** React 19
*   **Styling:** Tailwind CSS 4
*   **Sprache:** TypeScript
*   **UI-Komponenten:** shadcn/ui

Das Design ist **mobile-first** entwickelt und vollständig **responsiv**, um eine optimale Darstellung und Bedienung auf verschiedenen Geräten zu gewährleisten.

## Installation und Start

Um die App lokal zu installieren und zu starten, folgen Sie diesen Schritten:

1.  **Repository klonen:**
    ```bash
    git clone https://github.com/UrgentOptimist/Zahlenkoenig.git
    cd Zahlenkoenig
    ```

2.  **Abhängigkeiten installieren:**
    ```bash
    pnpm install
    ```

3.  **Entwicklungsmodus starten:**
    ```bash
    pnpm dev
    ```
    Die App ist dann unter `http://localhost:5173` (oder einem ähnlichen Port) verfügbar.

4.  **Produktions-Build erstellen:**
    ```bash
    pnpm build
    ```

5.  **Produktions-Server starten:**
    ```bash
    pnpm start
    ```

## Beitrag leisten

Wir freuen uns über Beiträge zur Verbesserung des Zahlenkönigs. Bitte beachten Sie unsere [Contributing Guidelines](CONTRIBUTING.md) (falls vorhanden) für weitere Informationen.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Weitere Details finden Sie in der [LICENSE](LICENSE) Datei (falls vorhanden).
