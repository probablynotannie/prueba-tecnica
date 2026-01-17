
![2b1dfec19b945a19ac39641278a6a799](https://github.com/user-attachments/assets/52e1a2af-95f6-49b7-8300-7006695f4091)

# Prueba técnica - combate de Pokemons
> https://pokemon-battle-lime.vercel.app

## Instalación y ejecución

### Clonar el repositorio usando terminal
```bash
git clone https://github.com/probablynotannie/prueba-tecnica
```

### Entrar al proyecto
```bash
cd pokemon-battle
```
### Instalar dependencias
```bash
npm install
```

### Ejecutar el proyecto
```bash
npm run dev
```

### La app debería de estar disponible en localhost:5173 a no ser que este ocupado

> http://localhost:5173


## Versiones utilizadas

- Node.js: 20.15.0
- React: 19.2.0
- Vite: 7.2.4
- Tailwind CSS: 4.1.18
- Zustand: 5.0.10
- @dnd-kit/core: 6.3.1
- @dnd-kit/sortable 10.0.0
- tanstack: 5.90.17
- react.icons 5.5.0
- vitest 4.0.17


## Estructura de carpetas, archivos y arquitectura

He decidido organizar el código por funcionalidades principales en lugar de por tipo técnico.
Esta estructura favorece la separación de responsabilidades, mejora la escalabilidad y facilita el mantenimiento del proyecto.

- pokemons/: listado y exploración de Pokémon (filtros, paginación y vistas).

- team/: construcción y gestión de equipos Pokémon.

- combat/: selección de equipos y simulación del combate.

#### Módulos compartidos

- api/: comunicación con la API externa.
- hooks/: lógica reutilizable para obtención de datos.
- store/: estado global con Zustand.
- utils/: lógica de combate independiente de la UI.
- structure/: componentes estructurales reutilizables (Header, Footer, Modal).

---

### Estructura general

```text
src/
├── api/
│   └── pokemonApi.js                    # Llama a la api de pokemons listado / detalles
│
├── components/
│   ├── combat/
│   │   ├── BattleLoader.jsx             # Un placeholder para simular la batalla
│   │   ├── BattlePage.jsx               # Vista principal del combate
│   │   ├── TeamPreview.jsx              # Información de pokemons por equipo
│   │   └── TeamSelector.jsx             # Selector de equipos de combate
│   │
│   ├── pokemons/
│   │   ├── View/                        
│   │       ├── Boxy.jsx                 # Listado de Pokémon en cajas
│   │       ├── Table.jsx                # Listado de Pokémon en tabla
│   │   ├── Filtering.jsx                # Filtrado por nombre y tipo + vaciar filtrado
│   │   ├── Loading.jsx                  # Placeholder mienstras se cargan los pokemons
│   │   ├── Pagination.jsx               # Paginación para listado
│   │   └── Pokemons.jsx                 # Vista principal para sacar datos de los pokemons
│   │
│   ├── team/
│   │   ├── SortablePokemon.jsx          # Información de pokemon + posibilidad de borrar del equipo
│   │   └── TeamBuilder.jsx              # Constructor de equipos de pokemon + drag & drop
│   │
│   └── structure/
│       ├── Header.tsx                   # Cabecera de la aplicación
│       ├── Footer.tsx                   # Pie de página
│       └── Modal.tsx                    # Componente modal reutilizable
│
├── hooks/
│   ├── usePokemons.js                   # Hook para sacar listado de pokemons
│   └── usePokemonDetails.js             # Hook para sacar detalles por nombre de un pokemon
│
├── store/
│   └── teamStore.js                     # Estado global con Zustand: añadir/borrar/reordenar/guardar/descartar los pokemons
│
├── utils/
│   └── battleLogic.js                   # Simulación y reglas de combate
│
├── tests/
│   ├── battleLogic.test.js               # Tests de lógica de combate
│   └── PokemonList.test.js               # Tests de componente de listado de pokemons
│
├── App.tsx                               # Componente raíz de la aplicación
├── main.tsx                              # Punto de entrada (React + Vite)
└── index.css                             # Estilos globales (Tailwind)
```



