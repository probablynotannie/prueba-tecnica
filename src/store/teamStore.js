import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const normalizePokemon = (pokemon) => ({
    name: pokemon.name,
    stats: pokemon.stats.filter(s =>
        ['attack', 'defense', 'speed'].includes(s.stat.name)
    ),
    sprites: {
        front_default: pokemon.sprites?.front_default
    }
})

export const useTeamsStore = create(

    persist(
        (set) => ({
            teams: [],
            draftTeam: [],


            addToDraft: (pokemon) =>
                set(state => {
                    if (state.draftTeam.length >= 6) return state

                    return {
                        draftTeam: [...state.draftTeam, normalizePokemon(pokemon)]
                    }
                }),

            removeFromDraft: (name) =>
                set((state) => ({
                    draftTeam: state.draftTeam.filter(p => p.name !== name)
                })),
            reorderDraft: (newOrder) =>
                set({
                    draftTeam: newOrder
                }),
            saveTeam: (teamName) =>
                set((state) => ({
                    teams: [
                        ...state.teams,
                        {
                            id: crypto.randomUUID(),
                            name: teamName,
                            pokemons: state.draftTeam
                        }
                    ],
                    draftTeam: []
                })),

            discardDraft: () => set({ draftTeam: [] })
        }),
        {
            name: 'pokemon-teams-storage'
        }
    )
)
