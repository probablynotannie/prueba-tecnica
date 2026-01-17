import { describe, it, expect } from 'vitest'
import { simulateBattle } from '../utils/battleLogic'

const pikachu = {
    name: 'pikachu',
    stats: [
        { stat: { name: 'attack' }, base_stat: 55 },
        { stat: { name: 'defense' }, base_stat: 40 },
        { stat: { name: 'speed' }, base_stat: 90 }
    ]
}

const bulbasaur = {
    name: 'bulbasaur',
    stats: [
        { stat: { name: 'attack' }, base_stat: 49 },
        { stat: { name: 'defense' }, base_stat: 49 },
        { stat: { name: 'speed' }, base_stat: 45 }
    ]
}

describe('simulateBattle', () => {
    it('pikachu gana contra bulbasaur por stats superiores', () => {
        const result = simulateBattle([pikachu], [bulbasaur])
        expect(result.rounds.length).toBe(1)
        expect(result.rounds[0].winner).toBe('pikachu')
        expect(result.result.teamA.alive).toBe(1)
        expect(result.result.teamB.alive).toBe(0)
    })
})
