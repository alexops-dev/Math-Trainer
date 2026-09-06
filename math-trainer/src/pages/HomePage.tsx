interface HomePageProps {
  onStartExercise: (
    exerciseId: string
  ) => void;
}

function HomePage({
  onStartExercise,
}: HomePageProps) {
  return (
    <main className="app">
      <div className="trainer-card home-page">

        <img
          src="/logo-math-trainer.png"
          alt="Math Trainer"
          className="app-logo"
        />

        <h1 className="home-title">
          Willkommen beim Math Trainer!
        </h1>

        <p className="home-intro">
          Hier kannst du Mathematik Schritt
          für Schritt üben und neue Tricks
          entdecken.
        </p>

        <h2 className="exercise-selection-title">
          Wähle deine Übung
        </h2>

        <div className="exercise-cards">

          <button
            className="exercise-card"
            onClick={() =>
              onStartExercise(
                'subtraction-crossing-20'
              )
            }
          >
            <span className="exercise-card-icon">
              ➖
            </span>

            <strong>
              Subtraktion
            </strong>

            <span>
              Mit Zehnerübergang bis 20
            </span>

            <span className="exercise-card-action">
              Starten →
            </span>
          </button>

          <button
            className="exercise-card"
            onClick={() =>
              onStartExercise(
                'addition-crossing-20'
              )
            }
          >
            <span className="exercise-card-icon">
              ➕
            </span>

            <strong>
              Addition
            </strong>

            <span>
              Mit Zehnerübergang bis 20
            </span>

            <span className="exercise-card-action">
              Starten →
            </span>
          </button>

        </div>
      </div>
    </main>
  );
}

export default HomePage;