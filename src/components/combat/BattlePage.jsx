import { useState } from "react";
import { useTeamsStore } from "../../store/teamStore";
import { simulateBattle } from "../../utils/battleLogic";
import TeamPreview from "./TeamPreview";
import { FaTrophy } from "react-icons/fa";
import TeamSelector from "./TeamSelector";
import BattleLoader from "./BattleLoader";
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
    setIsBattling(true);
    setResult(null);

    setTimeout(() => {
      const battleResult = simulateBattle(teamA.pokemons, teamB.pokemons);
      setResult(battleResult);
      setIsBattling(false);
    }, 1200);
  };

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
      <div className=" mb-4 grid md:grid-cols-2 gap-10">
        <div className="rounded-xl border border-slate-300 bg-white shadow-sm p-5 flex flex-col gap-4 h-fit">
          <TeamSelector
            label={"— Equipo A —"}
            teams={teams}
            value={teamAId}
            onChange={(e) => setTeamAId(e.target.value)}
          />
          <TeamPreview team={teamA} label="Equipo A" />
        </div>
        <div className="rounded-xl border border-slate-300 bg-white shadow-sm p-5 flex flex-col gap-4 h-fit">
          <TeamSelector
            label={"— Equipo B  —"}
            value={teamBId}
            teams={teams}
            onChange={(e) => setTeamBId(e.target.value)}
          />
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
                      {round.winner.name}
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
