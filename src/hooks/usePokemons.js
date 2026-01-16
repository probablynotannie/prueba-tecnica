import { useQuery } from '@tanstack/react-query'
import { getPokemons } from '../api/pokeApi'

export const usePokemons = () => {
    return useQuery({
        queryKey: ['pokemons'],
        queryFn: getPokemons
    })
}
