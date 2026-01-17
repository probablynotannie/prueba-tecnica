import { GoDotFill } from "react-icons/go";

function BattleLoader() {
  return (
    <div className="my-6 p-6 rounded-xl border border-slate-300 bg-linear-to-r from-slate-50 to-slate-100 shadow-inner">
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className="flex gap-2">
          <GoDotFill className="animate-bounce text-pink-500 [animation-delay:0ms]" />
          <GoDotFill className="animate-bounce text-blue-500 [animation-delay:150ms]" />
          <GoDotFill className="animate-bounce text-orange-500 [animation-delay:300ms]" />
        </div>
      </div>
      <p className="text-center text-sm text-slate-600 animate-pulse">
        Los Pokémon están luchando…
      </p>
    </div>
  );
}

export default BattleLoader;
