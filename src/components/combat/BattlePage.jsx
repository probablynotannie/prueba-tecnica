import { useState } from "react";
import { useTeamsStore } from "../../store/teamStore";
import { simulateBattle } from "../../utils/battleLogic";
import TeamPreview from "./TeamPreview";
import { GoDotFill } from "react-icons/go";
import { FaTrophy } from "react-icons/fa";
import TeamSelector from "./TeamSelector";
export default function BattlePage() {
  const teams = useTeamsStore((state) => state.teams);
  const [teamAId, setTeamAId] = useState("");
  const [teamBId, setTeamBId] = useState("");
  const [result, setResult] = useState(null);
  const teamA = teams.find((t) => t.id === teamAId);
  const teamB = teams.find((t) => t.id === teamBId);

  const [isBattling, setIsBattling] = useState(false);
  const handleBattle = () => {
    if (!teamA || !teamB) return;
    console.log(teamA);
    setIsBattling(true);
    setResult(null);

    setTimeout(() => {
      const battleResult = simulateBattle(teamA.pokemons, teamB.pokemons);
      setResult(battleResult);
      setIsBattling(false);
    }, 1200);
  };
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

  const getStat = (pokemon, stat) =>
    pokemon.stats.find((s) => s.stat.name === stat)?.base_stat ?? 0;
  const roundsWithStats =
    result && teamA && teamB
      ? (() => {
          let indexA = 0;
          let indexB = 0;

          return result.rounds.map((round) => {
            const pokemonA = teamA.pokemons[indexA];
            const pokemonB = teamB.pokemons[indexB];
            const winner = round.winner === pokemonA.name ? pokemonA : pokemonB;
            const loser = winner === pokemonA ? pokemonB : pokemonA;
            if (winner === pokemonA) indexB++;
            else indexA++;
            return { pokemonA, pokemonB, winner, loser };
          });
        })()
      : [];

  return (
    <div className="rounded-xl border shadow-lg hover:shadow-xl transition duration-300 bg-slate-50 p-5 border-slate-200">
      <h1 className="text-2xl font-bold mb-4">Combate Pokémon</h1>
      <div className=" mb-4 grid grid-cols-2 gap-10">
        <div className="rounded-xl border border-slate-300 bg-white shadow-sm p-5 flex flex-col gap-4 h-fit">
          <h2 className="text-lg font-semibold text-slate-800 text-center">
            Selecciona tu equipo
          </h2>
          <p className="text-xs text-slate-500 text-center">
            Elige un equipo guardado para el combate
          </p>
          <select
            value={teamAId}
            onChange={(e) => setTeamAId(e.target.value)}
            className="
      border rounded-lg p-2 text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500
      bg-slate-50
    "
          >
            <option value="">— Equipo A —</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          {!teamAId && (
            <span className="text-xs text-slate-400 text-center">
              Ningún equipo seleccionado
            </span>
          )}
          <TeamPreview team={teamA} label="Equipo A" />
        </div>
        <div className="rounded-xl border border-slate-300 bg-white shadow-sm p-5 flex flex-col gap-4 h-fit">
          <h2 className="text-lg font-semibold text-slate-800 text-center">
            Selecciona tu equipo
          </h2>
          <p className="text-xs text-slate-500 text-center">
            Elige un equipo guardado para el combate
          </p>
          <select
            value={teamBId}
            onChange={(e) => setTeamBId(e.target.value)}
            className="
      border rounded-lg p-2 text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500
      bg-slate-50
    "
          >
            <option value="">— Equipo A —</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          {!teamBId && (
            <span className="text-xs text-slate-400 text-center">
              Ningún equipo seleccionado
            </span>
          )}
          <TeamPreview team={teamB} label="Equipo B" />
        </div>
      </div>
      <button
        onClick={handleBattle}
        disabled={!teamA || !teamB || teamAId === teamBId}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Pelear
      </button>
      {isBattling && <BattleLoader />}
      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Resultado del combate</h2>
          <p className="text-slate-500 text-sm mb-4">
            Un total de {result.rounds.length} rondas jugadas.
          </p>
          <ul className="space-y-2 text-sm">
            {roundsWithStats.map((round, index) => {
              const atkWinner = getStat(round.winner, "attack");
              const defLoser = getStat(round.loser, "defense");
              const speedWinner = getStat(round.winner, "speed");
              const speedLoser = getStat(round.loser, "speed");
              console.log(teamA);
              const reason =
                atkWinner > defLoser
                  ? `Ataque (${atkWinner}) > Defensa (${defLoser})`
                  : `Gana por velocidad (${speedWinner} vs ${speedLoser})`;
              return (
                <li
                  key={index}
                  className="border rounded p-2 bg-slate-50 border-slate-200 border-l-4 border-l-pink-700 pl-5"
                >
                  <div className="flex items-start gap-2">
                    <FaTrophy className="text-xl text-pink-700" />{" "}
                    <span className="capitalize text-pink-600 font-semibold">
                      {teamA.name}
                    </span>{" "}
                    derrota a{" "}
                    <span className="capitalize text-pink-600 font-semibold">
                      {round.loser.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{reason}</p>
                </li>
              );
            })}
          </ul>
          <div className="grid grid-cols-2 gap-4 text-sm mt-10">
            <div className="border p-3 rounded bg-green-50 border-green-700">
              <h4 className="font-semibold">{teamA.name}</h4>
              <p>Con vida: {result.result.teamA.alive}</p>
              <p>Debilitados: {result.result.teamA.defeated}</p>
            </div>

            <div className="border p-3 rounded bg-blue-50 border-blue-700">
              <h4 className="font-semibold">{teamB.name}</h4>
              <p>Con vida: {result.result.teamB.alive}</p>
              <p>Debilitados: {result.result.teamB.defeated}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
