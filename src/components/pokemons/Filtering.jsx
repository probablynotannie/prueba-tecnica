import { IoIosRefresh } from "react-icons/io";

function Filtering({ search, handleSearchChange, selectedType, handleTypeChange, allTypes, clearFilters }) {
    return (
        <div className="grid md:grid-cols-12 gap-4 mb-6">
            <input
                type="text"
                placeholder="Buscar Pokémon por nombre..."
                value={search}
                onChange={handleSearchChange}
                className="col-span-12 md:col-span-8 border p-2 bg-white rounded-lg border-slate-300"
            />

            <select
                value={selectedType}
                onChange={handleTypeChange}
                className="col-span-12 md:col-span-3 border p-2 bg-white rounded-lg border-slate-300"
            >
                <option value="">Todos los tipos</option>
                {allTypes.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <button
                onClick={clearFilters}
                className="hover:cursor-pointer col-span-12 md:col-span-1 bg-white rounded-lg border flex justify-center items-center border-slate-300 text-red-600 p-2e"
            >
                <IoIosRefresh />
            </button>
        </div>
    )
}

export default Filtering