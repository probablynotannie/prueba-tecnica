import { useState, useCallback } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from '@dnd-kit/sortable'

import { useTeamsStore } from '../../store/teamStore'
import SortablePokemon from './SortablePokemon'
import { MdCancel } from 'react-icons/md'

export default function TeamBuilder({ onClose }) {
    const draftTeam = useTeamsStore(state => state.draftTeam)
    const reorderDraft = useTeamsStore(state => state.reorderDraft)
    const saveTeam = useTeamsStore(state => state.saveTeam)
    const discardDraft = useTeamsStore(state => state.discardDraft)
    const [teamName, setTeamName] = useState('')
    const handleDragEnd = useCallback(
        (event) => {
            const { active, over } = event
            if (!over || active.id === over.id) return

            const oldIndex = draftTeam.findIndex(p => p.name === active.id)
            const newIndex = draftTeam.findIndex(p => p.name === over.id)

            reorderDraft(arrayMove(draftTeam, oldIndex, newIndex))
        },
        [draftTeam, reorderDraft]
    )
    const shuffleTeam = () => {
        reorderDraft([...draftTeam].sort(() => Math.random() - 0.5))
    }
    const getStat = (pokemon, stat) =>
        pokemon.stats.find(s => s.stat.name === stat)?.base_stat ?? 0
    const sortByAttack = () => {
        reorderDraft(
            [...draftTeam].sort(
                (a, b) => getStat(b, 'attack') - getStat(a, 'attack')
            )
        )
    }

    return (
        <section className="bg-white rounded-2xl shadow-xl border border-slate-200 max-h-[80vh] flex flex-col">
            {/* HEADER */}
            <header className="flex justify-between items-center px-4 py-3 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">
                    Mi equipo
                </h2>

                <div className="flex items-center gap-3">
                    <span
                        className={`text-xs px-2 py-1 rounded-full font-medium
          ${draftTeam.length === 6
                                ? 'bg-green-100 text-green-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                    >
                        {draftTeam.length} / 6
                    </span>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-700 transition"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </header>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-4">
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={draftTeam.map(p => p.name)}
                        strategy={verticalListSortingStrategy}
                    >
                        <ul className="space-y-2 mb-4">
                            {draftTeam.map(pokemon => (
                                <SortablePokemon
                                    key={pokemon.name}
                                    pokemon={pokemon}
                                />
                            ))}
                        </ul>
                    </SortableContext>
                </DndContext>

                <input
                    className="w-full border rounded-lg p-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-300 bg-white"
                    placeholder="Nombre del equipo"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />

                {/* SORT CONTROLS */}
                <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 mb-2">
                        Ordenar por
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={shuffleTeam}
                            className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 transition"
                        >
                            Aleatorio
                        </button>
                        <button
                            onClick={sortByAttack}
                            className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 transition"
                        >
                            Ataque
                        </button>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            saveTeam(teamName)
                            setTeamName('')
                            onClose()
                        }}
                        disabled={!teamName || draftTeam.length !== 6}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-blue-500 transition"
                    >
                        Guardar equipo
                    </button>

                    <button
                        onClick={discardDraft}
                        className="px-4 py-2 rounded-lg text-sm bg-red-50 text-red-600 hover:bg-red-100 transition border border-red-300"
                    >
                        Descartar
                    </button>
                </div>
            </footer>
        </section>


    )
}
