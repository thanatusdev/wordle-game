"use client";

import { observer, useLocalObservable } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import Guesses from "./components/Guesses";
import Qwerty from "./components/Qwerty";
import WonLose from "./components/WonLose";
import WordleStore from "./store/wordle-store";

export default observer(function Home() {
  const store = useLocalObservable(() => WordleStore);

  const gameStart = useCallback(() => {
    store.init();
    window.addEventListener("keyup", store.handleKeyUp);

    return () => {
      window.removeEventListener("keyup", store.handleKeyUp);
    };
  }, [store]);

  useEffect(() => {
    gameStart();
  }, [gameStart]);

  return (
    <div className="gap-6 flex overflow-x-hidden flex-col h-screen w-screen items-center justify-center">
      <h1 className="text-6xl text-black dark:text-blue-500 font-bold">
        Wordle
      </h1>
      <div className="flex flex-col gap-1">
        {store.guesses.map((_, i) => (
          <Guesses
            key={i}
            word={store.word}
            guess={store.guesses[i]}
            isGuessed={i < store.currentGuess}
          />
        ))}
      </div>
      <WonLose won={store.won} lost={store.lost} restart={store.init} />
      <Qwerty store={store} />
    </div>
  );
});
