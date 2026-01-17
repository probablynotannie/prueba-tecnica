<!-- Project Banner -->
<!-- ![Project Banner](assets/react.svg) -->

# Pokémon Battle

## Requisitos

- **Node.js** ≥ 18.x  
- **npm** ≥ 9.x  

---

## Instalación y ejecución

### Clonar el repositorio
```bash
git clone <url-del-repositorio>
Entrar al proyecto
bash
Copiar código
cd pokemon-battle
Instalar dependencias
bash
Copiar código
npm install
Ejecutar en modo desarrollo
bash
Copiar código
npm run dev
La aplicación estará disponible en:

arduino
Copiar código
http://localhost:5173
Versión online
La aplicación también está publicada en Vercel para visualización en producción.

Tests
Ejecutar tests
bash
Copiar código
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

text
Copiar código
src/
├── api/                # Lógica de acceso a la PokeAPI
├── assets/             # Recursos estáticos
├── components/
│   ├── combat/         # Combate y visualización de resultados
│   ├── pokemons/       # Listado de Pokémon, filtros y vistas
│   ├── team/           # Gestión de equipos y drag & drop
│   └── structure/      # Componentes estructurales (Header, Footer, Modal)
├── hooks/              # Hooks personalizados para datos y lógica
├── store/              # Estado global con Zustand
├── utils/              # Lógica de negocio (simulación de combate)
├── tests/              # Tests unitarios de lógica y UI