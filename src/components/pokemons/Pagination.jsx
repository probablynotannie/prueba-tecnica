import React from "react";

function Pagination({ totalPages, page, setPage }) {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-white border rounded disabled:opacity-50 hover:cursor-pointer"
          >
            Anterior
          </button>

          <span className="text-sm">
            Página {page + 1} de {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 bg-white border rounded disabled:opacity-50 hover:cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
