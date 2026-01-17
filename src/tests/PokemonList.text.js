import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PokemonList from './PokemonList'

vi.mock('../store/teamStore', () => ({
    useTeamsStore: () => ({
        draftTeam: [],
        addToDraft: vi.fn()
    })
}))
vi.mock('../hooks/usePokemons', () => ({
    usePokemons: () => ({
        isLoading: false,
        data: {
            count: 1,
            results: [{ name: 'pikachu' }]
        }
    })
}))

vi.mock('../hooks/usePokemonDetails', () => ({
    usePokemonDetails: () => ([
        {
            isLoading: false,
            data: {
                name: 'pikachu',
                sprites: { front_default: 'pikachu.png' },
                stats: [],
                types: [{ type: { name: 'electric' } }]
            }
        }
    ])
}))

describe('PokemonList UI', () => {
    it('muestra un pokemon y el botón Añadir', () => {
        render(<PokemonList />)

        expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
        expect(screen.getByText(/añadir/i)).toBeInTheDocument()
    })
})
