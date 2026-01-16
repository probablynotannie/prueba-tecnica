import { FaShieldAlt } from 'react-icons/fa'
import { LuSword } from 'react-icons/lu'
import { SlEnergy } from 'react-icons/sl'
import { AiOutlinePlus } from 'react-icons/ai'

const typeColors = {
    fire: 'bg-red-100 text-red-700',
    water: 'bg-blue-100 text-blue-700',
    grass: 'bg-green-100 text-green-700',
    electric: 'bg-yellow-100 text-yellow-700',
    poison: 'bg-purple-100 text-purple-700',
    flying: 'bg-sky-100 text-sky-700',
    bug: 'bg-lime-100 text-lime-700',
    normal: 'bg-gray-100 text-gray-700',
    ground: 'bg-amber-100 text-amber-700',
    fairy: 'bg-pink-100 text-pink-700',
    fighting: 'bg-orange-100 text-orange-700',
    psychic: 'bg-fuchsia-100 text-fuchsia-700',
    rock: 'bg-stone-100 text-stone-700',
    steel: 'bg-slate-200 text-slate-700',
    ice: 'bg-cyan-100 text-cyan-700',
    dragon: 'bg-indigo-100 text-indigo-700',
}

function Boxy({ visiblePokemons, isInDraft, getStat, addToDraft }) {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {visiblePokemons.map(pokemon => {
                const alreadyAdded = isInDraft(pokemon.name)
                return (
                    <div
                        key={pokemon.name}
                        className={`
              relative flex flex-col rounded-2xl p-4 transition-all
              ${alreadyAdded
                                ? 'bg-red-50 border border-red-300'
                                : 'bg-white border border-slate-200 hover:border-pink-500 hover:shadow-xl'}
            `}
                    >
                        {alreadyAdded && (
                            <div className="absolute inset-0 bg-black/30 rounded-2xl z-10 flex items-start pt-5 justify-center text-red-700 font-semibold text-sm">
                                <span className='bg-red-500 p-1 rounded-lg text-white'>  Ya en el equipo</span>
                            </div>
                        )}
                        <div className="flex justify-center mb-2">
                            {pokemon.sprites?.front_default ? (
                                <img
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    className="w-24 h-24"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                            ) : (
                                <div className="w-24 h-24 bg-slate-100 rounded-full" />
                            )}
                        </div>
                        <h3 className="capitalize font-bold text-center mb-1">
                            {pokemon.name}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                            {pokemon.types.map(t => (
                                <span
                                    key={t.type.name}
                                    className={`text-xs px-2 py-0.5 rounded-full ${typeColors[t.type.name] ?? 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 mb-4">
                            <div className="flex flex-col items-center">
                                <LuSword className="text-red-600 mb-0.5" />
                                <span>{getStat(pokemon, 'attack')}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <FaShieldAlt className="text-blue-700 mb-0.5" />
                                <span>{getStat(pokemon, 'defense')}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <SlEnergy className="text-yellow-600 mb-0.5" />
                                <span>{getStat(pokemon, 'speed')}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => addToDraft(pokemon)}
                            disabled={alreadyAdded}
                            className={`
                mt-auto flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all
                ${alreadyAdded
                                    ? 'bg-red-300 text-red-800 cursor-not-allowed'
                                    : 'bg-pink-700 text-white hover:bg-pink-600'}
              `}
                        >
                            <AiOutlinePlus />
                            {alreadyAdded ? 'Añadido' : 'Añadir'}
                        </button>
                    </div>
                )
            })}
        </section>
    )
}

export default Boxy
