import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { LuSword } from 'react-icons/lu'
import { FaShieldAlt, FaTrash, FaTrashAlt } from 'react-icons/fa'
import { SlEnergy } from 'react-icons/sl'
import { MdDragIndicator } from 'react-icons/md'
import { useTeamsStore } from '../../store/teamStore'

const SortablePokemon = memo(function SortablePokemon({ pokemon }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: pokemon.name })
    const removeFromDraft = useTeamsStore(state => state.removeFromDraft)
    const attack =
        pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat ?? 0
    const defense =
        pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat ?? 0
    const speed =
        pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat ?? 0
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li
            ref={setNodeRef}
            style={style}
            className={`
        flex items-center justify-between gap-3 p-3 border rounded-lg transition
        ${isDragging ? 'bg-slate-100' : 'bg-white border-slate-200'}
      `}
        >
            <div>
                <div className="flex items-center gap-3 select-none">
                    <div
                        {...attributes}
                        {...listeners}
                        className="cursor-grab text-slate-400 hover:text-slate-600"
                        title="Arrastrar"
                    >
                        <MdDragIndicator size={20} />
                    </div>
                    <span className="capitalize font-medium w-24">
                        {pokemon.name}
                    </span>
                </div>
                <div className="flex gap-3 text-xs text-slate-600 mt-1">
                    <span className="flex items-center gap-1">
                        <LuSword className="text-red-700" /> {attack}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaShieldAlt className="text-blue-800" /> {defense}
                    </span>
                    <span className="flex items-center gap-1">
                        <SlEnergy className="text-yellow-600" /> {speed}
                    </span>
                </div>
            </div>
            <button
                onClick={() => removeFromDraft(pokemon.name)}
                disabled={isDragging}
                className="text-md text-slate-600 hover:text-red-800 disabled:opacity-50"
            >
                <FaTrashAlt />
            </button>
        </li>
    )
})

export default SortablePokemon
