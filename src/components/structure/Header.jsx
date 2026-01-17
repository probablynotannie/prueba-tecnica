import { GiBattleTank, GiTeamIdea } from 'react-icons/gi'
import { SiPokemon } from 'react-icons/si'

function Header({ page, setPage }) {
    return (
        <header className="bg-linear-to-r from-slate-800 to-slate-950 text-white h-[10vh] flex items-center justify-between px-6 shadow-lg">

            <SiPokemon size={98} className="text-pink-400" />

            <nav className="flex gap-2 bg-slate-800/50 border border-slate-800 p-1 rounded-xl">
                <button
                    onClick={() => setPage('list')}
                    className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
            ${page === 'list'
                            ? 'bg-pink-600 text-white shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }
          `}
                >
                    <GiTeamIdea size={18} />
                    Equipos
                </button>

                <button
                    onClick={() => setPage('battle')}
                    className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
            ${page === 'battle'
                            ? 'bg-indigo-600 text-white shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }
          `}
                >
                    <GiBattleTank size={18} />
                    Combate
                </button>
            </nav>
        </header>
    )
}

export default Header
