import { observer } from "mobx-react-lite";
import { cn } from "../lib/utils";

type Props = {
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
              >
                {key.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default observer(Qwerty);
