import words from "../lib/words.json";

const store = {
  word: "",
  guesses: [],
  currentGuess: 0,
  get won() {
    return this.guesses[this.currentGuess - 1] === this.word;
  },
  get lost() {
    return this.currentGuess === 6;
  },
  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join("").split("");
  },
  get exactGuess() {
    return this.word
      .split("")
      .filter((letter: string, i) => letter === this.allGuesses[i]);
  },
  get inexactGuess() {
    return this.word
      .split("")
      .filter((letter: string) => this.allGuesses.includes(letter));
  },
  init() {
    this.word = words[Math.floor(Math.random() * words.length)];
    this.guesses.replace(new Array(6).fill(""));
    this.currentGuess = 0;
  },
  submitGuess() {
    if (words.includes(this.guesses[this.currentGuess])) {
      this.currentGuess++;
    }
  },
  handleKeyUp(event: KeyboardEvent) {
    if (this.won || this.lost) return;

    if (event.key === "Enter") {
      return this.submitGuess();
    }

    if (event.key === "Backspace") {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        this.guesses[this.currentGuess] - 1,
      );
      return;
    }

    if (
      this.guesses[this.currentGuess].length < 5 &&
      event.key.match(/^[a-zA-Z]$/)
    ) {
      this.guesses[this.currentGuess] += event.key.toLowerCase();
    }
  },
};

export default store;
