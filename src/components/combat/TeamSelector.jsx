export default function TeamSelector({
  teams,
  value,
  onChange,
  label,
  placeholder,
}) {
  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-sm p-5 flex flex-col gap-4 h-fit">
      <h2 className="text-lg font-semibold text-slate-800 text-center">
        {label}
      </h2>

      <p className="text-xs text-slate-500 text-center">
        Elige un equipo guardado para el combate
      </p>

      <select
        value={value}
        onChange={onChange}
        className="border rounded-lg p-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{placeholder}</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      {!value && (
        <span className="text-xs text-slate-400 text-center">
          Ningún equipo seleccionado
        </span>
      )}
    </div>
  );
}
