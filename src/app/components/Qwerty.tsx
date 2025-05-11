import { observer } from "mobx-react-lite";
import { cn } from "../lib/utils";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: any;
};

const Qwerty = ({ store }: Props) => {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div>
      {qwerty.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 px-4">
          {row.split("").map((key) => {
            const bgColor = store.exactGuess.includes(key)
              ? "bg-green-500"
              : store.inexactGuess.includes(key)
                ? "bg-yellow-500"
                : "bg-black";
            return (
              <button
                key={key}
                className={cn(
                  `w-10 h-10 rounded-md m-px flex items-center justify-center uppercase border border-gray-400`,
                  bgColor,
                )}
                onClick={() => {
                  if (store.won || store.lost) return;
                  if (key === "Enter") {
                    store.submitGuess();
                  } else if (key === "Backspace") {
                    store.guesses[store.currentGuess] = store.guesses[
                      store.currentGuess
                    ].slice(0, -1);
                  } else if (
                    store.guesses[store.currentGuess].length < 5 &&
                    key.match(/^[a-zA-Z]$/)
                  ) {
                    store.guesses[store.currentGuess] += key.toLowerCase();
                  }
                }}
              >
                {key.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
      <div className="flex md:hidden justify-center gap-1 mt-7 px-4">
        <button
          className="px-6 rounded-md m-px flex items-center justify-center uppercase border border-gray-400 bg-black"
          onClick={() => {
            if (store.won || store.lost) return;
            store.guesses[store.currentGuess] = store.guesses[
              store.currentGuess
            ].slice(0, -1);
          }}
        >
          Undo
        </button>
        <button
          className="px-6 rounded-md m-px flex items-center justify-center uppercase border border-gray-400 bg-black"
          onClick={() => {
            if (store.won || store.lost) return;
            store.submitGuess();
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default observer(Qwerty);
