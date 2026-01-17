import { useState } from 'react'
import { usePokemons } from '../../hooks/usePokemons'
import { usePokemonDetails } from '../../hooks/usePokemonDetails'
import { useTeamsStore } from '../../store/teamStore'
import { MdCancel } from 'react-icons/md'
import Pagination from './Pagination'
import Filtering from './Filtering'
import Table from './view/Table'
import Boxy from './view/Boxy'
import { FaBox, FaList } from 'react-icons/fa'
import Modal from '../structure/Modal'
import TeamBuilder from '../team/TeamBuilder'
export default function Pokemons() {
    const [open, setOpen] = useState(false)
    const [view, setView] = useState('boxy')
    const { data, isLoading } = usePokemons()
    const pokemonDetailsQueries = usePokemonDetails(data?.results || [])
    const draftTeam = useTeamsStore(state => state.draftTeam)
    const isInDraft = (pokemonName) =>
        draftTeam.some(p => p.name === pokemonName)
    const addToDraft = useTeamsStore(state => state.addToDraft)
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const ITEMS_PER_PAGE = 10
    const [page, setPage] = useState(0)
    const isDetailsLoading = pokemonDetailsQueries.some(q => q.isLoading)
    const allPokemons = pokemonDetailsQueries
        .map(q => q.data)
        .filter(Boolean)
    const allTypes = Array.from(
        new Set(
            allPokemons.flatMap(p =>
                p.types.map(t => t.type.name)
            )
        )
    )
    const getStat = (pokemon, stat) =>
        pokemon.stats.find(s => s.stat.name === stat)?.base_stat ?? 0

    const filteredPokemons = allPokemons.filter(pokemon => {
        const matchesName = pokemon.name
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesType = selectedType
            ? pokemon.types.some(t => t.type.name === selectedType)
            : true

        return matchesName && matchesType
    })
    const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE)
    const visiblePokemons = filteredPokemons.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setPage(0)
    }

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value)
        setPage(0)
    }

    const clearFilters = () => {
        setSearch('')
        setSelectedType('')
        setPage(0)
    }


    const skeletons = Array.from({ length: ITEMS_PER_PAGE })
    return (
        <section className="p-4 bg-slate-50 shadow-lg rounded-xl border border-slate-300 mb-10 min-h-[70vh]">
            <div className='flex justify-between items-center'>
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">
                        Elige tu equipo de Pokémons
                    </h1>
                    <span className="text-slate-400 text-sm">
                        Mostrando {visiblePokemons.length} de {filteredPokemons.length}
                    </span>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-slate-600 hover:bg-pink-600 text-white px-4 py-2 rounded-lg h-fit hover:scale-105 hover:cursor-pointer transition duration-300"
                >
                    equipo {draftTeam.length} / 6
                </button>
            </div>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <TeamBuilder onClose={() => setOpen(false)} />
            </Modal>

            {isLoading || isDetailsLoading ? (
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 p-4">
                    {skeletons.map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white rounded-xl p-4 shadow-md animate-pulse"
                        >
                            <div className="w-20 h-20 bg-gray-300 rounded-full mb-2" />
                            <div className="w-16 h-4 bg-gray-300 rounded mb-2" />
                            <div className="w-20 h-8 bg-gray-300 rounded" />
                        </div>
                    ))}
                </section>
            ) : (
                <>
                    <Filtering
                        search={search}
                        handleSearchChange={handleSearchChange}
                        selectedType={selectedType}
                        handleTypeChange={handleTypeChange}
                        allTypes={allTypes}
                        clearFilters={clearFilters}
                    />

                    <section>
                        {visiblePokemons.length === 0 ? (
                            <div className="col-span-5 flex flex-col items-center text-red-400 bg-red-50 p-6 rounded">
                                <MdCancel className="text-4xl mb-2 animate-pulse" />
                                <p>
                                    De <span className='font-semibold'>{data.count}</span> pokemons, has tenido que elegir uno que no existe.. Asi no ganas. :(
                                </p>
                            </div>
                        ) : <>
                            <div className='flex gap-3 my-4'>
                                <button
                                    onClick={() => setView("boxy")}
                                    className={`
                                        ${view === "boxy" ? "bg-pink-50 text-pink-600 border border-pink-400 p-2 rounded" : "bg-slate-50 text-slate-600 border border-slate-400 p-2 rounded"}
                                        `}>
                                    <FaBox />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={`
                                        ${view === "list" ? "bg-pink-50 text-pink-600 border border-pink-400 p-2 rounded" : "bg-slate-50 text-slate-600 border border-slate-400 p-2 rounded"}
                                        `}>
                                    <FaList />
                                </button>
                            </div>
                            {view === "boxy" ?
                                <Boxy
                                    visiblePokemons={visiblePokemons}
                                    isInDraft={isInDraft} getStat={getStat} addToDraft={addToDraft}
                                />
                                :
                                <Table
                                    visiblePokemons={visiblePokemons}
                                    isInDraft={isInDraft} getStat={getStat} addToDraft={addToDraft}
                                />
                            }

                        </>
                        }
                    </section>

                    <Pagination
                        totalPages={totalPages}
                        page={page}
                        setPage={setPage}
                    />
                </>
            )}
        </section>
    )
}
