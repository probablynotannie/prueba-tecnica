import { FaShieldAlt } from 'react-icons/fa'
import { LuSword } from "react-icons/lu";
import { SlEnergy } from 'react-icons/sl'
export default function TeamPreview({ team, label }) {
    if (!team) return null

    const getStat = (pokemon, statName) =>
        pokemon.stats.find(s => s.stat.name === statName)?.base_stat ?? 0

    return (
        <div className="border border-slate-200 rounded-lg p-3 bg-white">
            <h4 className="font-semibold mb-3">
                {label}: {team.name}
            </h4>

            <ul className="space-y-2 text-sm">
                {team.pokemons.map((pokemon, index) => {
                    const attack = getStat(pokemon, 'attack')
                    const defense = getStat(pokemon, 'defense')
                    const speed = getStat(pokemon, 'speed')

                    return (
                        <li
                            key={pokemon.name}
                            className="flex items-center justify-between gap-3 p-2 rounded bg-slate-50"
                        >
                            <span className="text-xs text-slate-400 w-5">
                                #{index + 1}
                            </span>
                            {pokemon.sprites?.front_default && (
                                <img
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    className="w-8 h-8"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none'
                                    }}
                                />
                            )}
                            <span className="capitalize font-medium w-24">
                                {pokemon.name}
                            </span>
                            <div className="flex gap-3 text-xs text-slate-600">
                                <span className='flex gap-1 items-center'><LuSword className='text-red-7500' /> {attack}</span>
                                <span className='flex gap-1 items-center'><FaShieldAlt className='text-blue-700' /> {defense}</span>
                                <span className='flex gap-1 items-center'><SlEnergy className='text-yellow-500' />{speed}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
