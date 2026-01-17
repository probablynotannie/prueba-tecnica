![Project Banner](assets/react.svg)


Requisitos
Node.js ≥ 18.x 
npm ≥ 9.x

Pasos
# Clonar el repositorio
git clone <url-del-repositorio>

# Entrar al proyecto
cd pokemon-battle

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

La aplicación estará disponible en:

http://localhost:5173

Tambien publicada en Vercel para versión visual:

npm run test

Ejecutar tests
npm run test

Versiones utilizadas

Node.js: 18.x

React: 18.x

Vite: 5.x

Tailwind CSS: 4.x

Zustand: 4.x

@dnd-kit/core: 6.x

Vitest / Testing Library: últimas versiones compatibles

Estructura del proyecto y arquitectura

El proyecto está organizado por dominios funcionales, separando lógica, estado y presentación:

src/
├── api/                # Lógica de acceso a la PokeAPI
├── assets/             # Recursos estáticos
├── components/
│   ├── combat/         # Combate y visualización de resultados
│   ├── pokemons/       # Listado de Pokémon, filtros y vistas
│   ├── team/           # Gestión de equipos y drag & drop
│   └── structure/      # Componentes estructurales (Header, Footer, Modal)
├── hooks/              # Hooks personalizados para datos y lógica
├── store/              # Estado global con Zustand (equipos y borradores)
├── utils/              # Lógica de negocio (simulación de combate)
├── tests/              # Tests unitarios de lógica y UI
