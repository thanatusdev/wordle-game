import { cn } from "../lib/utils";

type Props = {
  guess: string;
  word: string;
  isGuessed: boolean;
};

const Guesses = ({ guess, word, isGuessed }: Props) => {
  return (
    <div className="mb-2 grid grid-cols-5 gap-2">
      {new Array(5).fill(0).map((_, i) => {
        const bgColor = !isGuessed
          ? "bg-black"
          : guess[i] === word[i]
            ? "bg-green-500"
            : word.includes(guess[i])
              ? "bg-yellow-500"
              : "bg-black";
        return (
          <div
            key={i}
            className={cn(
              `h-16 w-16 flex items-center justify-center border border-gray-400 font-bold uppercase text-white text-xl`,
              bgColor,
            )}
          >
            {guess[i]}
          </div>
        );
      })}
    </div>
  );
};

export default Guesses;
