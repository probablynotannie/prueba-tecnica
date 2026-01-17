import { useState } from 'react'
import Pokemons from './components/pokemons/Pokemons'
import TeamBuilder from './components/team/TeamBuilder'
import BattlePage from './components/combat/BattlePage'
import Header from './components/structure/Header'
import Footer from './components/structure/Footer'
function App() {
  const [page, setPage] = useState('list')

  return (
    <>
      <Header
        page={page}
        setPage={setPage}
      />
      <main className="p-10  min-h-[70vh]">

        {page === 'list' && (
          <Pokemons />

        )}
        {page === 'battle' && <BattlePage />}
      </main>
      <Footer />
    </>

  )
}

export default App
