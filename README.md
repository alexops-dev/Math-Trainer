# Math Trainer

Math Trainer is a source-available educational pet project.
The source code is publicly available for learning, personal use, experimentation, and contributions. Commercial use is not permitted under the current license. 

This web application is created for helping children practice mathematics independently.

The project is primarily designed around topics taught in **German primary schools (Grundschule)** and started with one concrete learning goal:

> **Subtraktion mit Zehnerübergang** — subtraction across a tens boundary, for example `14 − 6 = 8`.

Math Trainer is intended to grow into a reusable collection of interactive mathematics exercises that parents, teachers, and children can run locally in a browser.

---

## Why this project exists

Some mathematical concepts become much easier for children through short, repeated practice.

In German primary school, subtraction with a tens transition (*Subtraktion mit Zehnerübergang*) is one of the topics that often requires more practice than simple subtraction within one ten.

Instead of using a fixed list of worksheets, Math Trainer generates new exercises automatically and provides immediate feedback.

The goal is to make practice:

- simple,
- interactive,
- child-friendly,
- repeatable,
- and easy to extend with new mathematical topics.

---

## Current functionality

The current version includes a playable exercise for:

### Subtraktion mit Zehnerübergang bis 20

Examples:

```text
14 − 6 = ?
13 − 5 = ?
17 − 9 = ?
```

The application currently supports:

- randomly generated subtraction exercises,
- validation of the child's answer,
- large on-screen number buttons,
- immediate correct/incorrect feedback,
- exercise progress within a session,
- correct-answer streaks,
- and step-by-step mathematical hints.

For example, instead of simply revealing the answer to:

```text
14 − 6
```

the hint engine explains the tens transition:

```text
14 − 4 = 10
10 − 2 = ?
```

This way the application is intended not only to test the child, but also to help explain the underlying calculation strategy.

---

## Modular architecture

Math Trainer is deliberately designed so that the user interface is **not tied to one specific exercise type**.

The application separates:

```text
Exercise configuration
        ↓
Exercise generator
        ↓
Mathematical logic
        ↓
Hint engine
        ↓
React UI
```

This means new mathematical topics can be added without rebuilding the complete application.

The long-term goal is to support exercises such as:

```text
Addition
Subtraction
Multiplication
Division
Missing numbers
Number ranges
Mental arithmetic
Word problems
```

and multiple difficulty levels for each topic.

---

## Exercise configuration

Exercise rules are defined through configuration files.

For example:

```json
{
  "id": "subtraction-crossing-20",
  "title": "Minus mit Zehnerübergang bis 20",
  "operation": "subtraction",

  "generator": {
    "minuendMin": 11,
    "minuendMax": 19,
    "subtrahendMin": 2,
    "subtrahendMax": 9,
    "resultMin": 1,
    "resultMax": 9,
    "requireTensCrossing": true,
    "allowNegative": false
  },

  "session": {
    "questions": 10
  },

  "hint": {
    "type": "bridgeToTen"
  }
}
```

The configuration describes **what should be trained**.

The TypeScript generator is responsible for creating valid exercises that match those rules.

This avoids maintaining large static lists such as:

```json
[
  { "question": "14 - 5", "answer": 9 },
  { "question": "13 - 7", "answer": 6 }
]
```

Instead, exercises are generated dynamically.

---

## Adding a new exercise type

The architecture is intended to make new exercise modules easy to add.

Depending on the type of exercise, a new module usually requires:

1. **A configuration file**

   Defines ranges, difficulty, session length, and generator options.

2. **An exercise generator**

   Contains the mathematical rules required to create valid exercises.

3. **A hint strategy** *(optional)*

   Explains the mathematical method without immediately revealing the final answer.

4. **Type definitions**

   If the new exercise introduces additional configuration or exercise structures.

5. **Tests**

   Generator logic should be tested independently from the React user interface.

Example structure:

```text
src/
├── components/
│   ├── Hint.tsx
│   └── NumberPad.tsx
│
├── config/
│   └── subtraction-crossing-20.json
│
├── math/
│   ├── generators/
│   │   └── subtraction.ts
│   │
│   ├── hints/
│   │   └── bridgeToTen.ts
│   │
│   ├── types.ts
│   └── utils.ts
│
├── App.tsx
├── App.css
└── main.tsx
```

As the project grows, additional modules could look like:

```text
config/
├── subtraction-crossing-20.json
├── subtraction-within-100.json
├── addition-crossing-20.json
└── multiplication-basic.json

math/generators/
├── subtraction.ts
├── addition.ts
└── multiplication.ts

math/hints/
├── bridgeToTen.ts
├── additionBridgeToTen.ts
└── multiplicationGroups.ts
```

---

## Technology stack

The project currently uses:

- **React**
- **TypeScript**
- **Vite**
- **CSS**
- JSON-based exercise configuration

Planned additions include:

- Vitest for mathematical business-logic tests,
- local progress persistence,
- session statistics,
- multiple exercise modules,
- configurable difficulty levels,
- and Docker packaging.

A backend or database is intentionally not required for the first versions of the project.

---

## Running locally

Requirements:

- Node.js
- npm

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd math-trainer
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local URL, usually:

```text
http://localhost:5173
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Project philosophy

The project follows a few simple principles:

- mathematical logic should be independent from the UI,
- exercise rules should be configurable,
- new topics should be easy to add,
- hints should teach a strategy rather than simply reveal answers,
- the child should receive immediate and encouraging feedback,
- and the application should remain simple enough to run locally.

---

## Roadmap

Planned milestones include:

- [x] Project setup with React, TypeScript and Vite
- [x] Configurable subtraction exercise generator
- [x] Playable number-pad interface
- [x] Correct / incorrect answer feedback
- [x] Progress indicator and streak counter
- [x] Step-by-step *Zehnerübergang* hint engine
- [ ] Session engine and final session statistics
- [ ] Track first-attempt accuracy separately from solved exercises
- [ ] Persist progress locally
- [ ] Add additional subtraction levels
- [ ] Add addition exercises
- [ ] Add multiplication exercises
- [ ] Automated tests for exercise generators
- [ ] Docker image for simple local deployment

---

## Open source

Math Trainer is an open-source pet project.

It was created both as a practical learning tool for children and as a software engineering project demonstrating how a small educational application can be built with:

- modular architecture,
- reusable TypeScript logic,
- configuration-driven behavior,
- separation of UI and business logic,
- and incremental feature development.

Contributions, ideas, new exercise modules, and improvements are welcome.

---

## Contributing

If you would like to add a new mathematical topic:

1. Fork the repository.
2. Create a feature branch.
3. Add or extend the exercise configuration.
4. Implement the required generator or hint strategy.
5. Add tests for the mathematical rules.
6. Open a pull request.

Please keep mathematical logic independent from presentation components whenever possible.

---

## License

A license has not been selected yet.

For a public open-source repository, a permissive license such as **MIT** can be added later if appropriate.
