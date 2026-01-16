import { FaShieldAlt } from 'react-icons/fa'
import { LuSword } from 'react-icons/lu'
import { SlEnergy } from 'react-icons/sl'
import { AiOutlinePlus } from 'react-icons/ai'

function Table({ visiblePokemons, isInDraft, getStat, addToDraft }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white">
            <table className="min-w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                    <tr>
                        <th className="px-4 py-3 text-left">Pokémon</th>
                        <th className="px-4 py-3 text-center">
                            <LuSword className="inline text-red-700" /> Ataque
                        </th>
                        <th className="px-4 py-3 text-center">
                            <FaShieldAlt className="inline text-blue-800" /> Defensa
                        </th>
                        <th className="px-4 py-3 text-center">
                            <SlEnergy className="inline text-yellow-600" /> Velocidad
                        </th>
                        <th className="px-4 py-3 text-center">Tipos</th>
                        <th className="px-4 py-3 text-center">Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {visiblePokemons.map(pokemon => {
                        const alreadyAdded = isInDraft(pokemon.name)

                        return (
                            <tr
                                key={pokemon.name}
                                className={`
                  border-t border-slate-100 transition
                  ${alreadyAdded
                                        ? 'bg-red-50 text-red-800 opacity-70'
                                        : 'hover:bg-slate-50'
                                    }
                `}
                            >
                                {/* Pokémon */}
                                <td className="px-4 py-3 flex items-center gap-3">
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
                                    <span className="capitalize font-medium">
                                        {pokemon.name}
                                    </span>
                                </td>

                                {/* Attack */}
                                <td className="px-4 py-3 text-center">
                                    {getStat(pokemon, 'attack')}
                                </td>

                                {/* Defense */}
                                <td className="px-4 py-3 text-center">
                                    {getStat(pokemon, 'defense')}
                                </td>

                                {/* Speed */}
                                <td className="px-4 py-3 text-center">
                                    {getStat(pokemon, 'speed')}
                                </td>

                                {/* Types */}
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-1 flex-wrap">
                                        {pokemon.types.map(t => (
                                            <span
                                                key={t.type.name}
                                                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                                            >
                                                {t.type.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                {/* Action */}
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => addToDraft(pokemon)}
                                        disabled={alreadyAdded}
                                        className={`
                      inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition
                      ${alreadyAdded
                                                ? 'bg-red-300 text-red-800 cursor-not-allowed'
                                                : 'bg-pink-700 text-white hover:bg-pink-600'
                                            }
                    `}
                                    >
                                        <AiOutlinePlus />
                                        {alreadyAdded ? 'Añadido' : 'Añadir'}
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
