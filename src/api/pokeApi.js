const BASE_URL = 'https://pokeapi.co/api/v2'

export const getPokemons = async () => {
    const res = await fetch(`${BASE_URL}/pokemon?limit=100000&offset=0`)
    return res.json()
}

export const getPokemonByName = async (name) => {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`)
    return res.json()
}
