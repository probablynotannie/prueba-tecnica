import { useQueries } from '@tanstack/react-query'
import { getPokemonByName } from '../api/pokeApi'

export const usePokemonDetails = (pokemons) => {
    return useQueries({
        queries: pokemons.map(pokemon => ({
            queryKey: ['pokemon', pokemon.name],
            queryFn: () => getPokemonByName(pokemon.name),
            staleTime: 1000 * 60 * 5
        }))
    })
}
