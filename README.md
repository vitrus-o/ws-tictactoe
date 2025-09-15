# ws-tictactoe

A simple, type-safe Tic-Tac-Toe game built with React and TypeScript. This was made with the help of the [React.dev tutorial](https://react.dev/learn/tutorial-tic-tac-toe). A personal change was made in relation to how the history is handled by the game. Instead of being able to jump into previous moves like in the original tutorial, an undo/redo/reset functionality was implemented for simplicity.

## Features

- Play Tic-Tac-Toe in your browser
- Undo, redo, and reset the board

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/vitrus-o/ws-tictactoe.git
cd ws-tictactoe
npm install
```

### Running the App

Start the development server:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```sh
npm run build
```

The production build will be in the `build` folder.

## Project Structure

```
src/
  assets/
    reset-svgrepo-com.svg
  components/
    Board.tsx
    Square.tsx
  types/
    types.ts
  utils/
    calculateWinner.ts
  App.tsx
  index.tsx
  styles.css
```

## Scripts

- `npm start` — Run the app in development mode
- `npm test` — Run tests
- `npm run build` — Build for production
- `npm run eject` — Eject configuration (not recommended)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

## Credits

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)