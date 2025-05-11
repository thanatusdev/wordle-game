type Props = {
  won: boolean;
  lost: boolean;
  restart: () => void;
};
const WonLose = ({ won, lost, restart }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {won && <div className="text-2xl text-green-500 font-bold">You won!</div>}
      {lost && <div className="text-2xl text-red-500 font-bold">You lost!</div>}
      {(won || lost) && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={restart}
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default WonLose;
