export function simulateBattle(teamA, teamB) {
    let indexA = 0
    let indexB = 0

    const rounds = []

    let currentA = teamA[indexA]
    let currentB = teamB[indexB]

    while (currentA && currentB) {
        const winner = fight(currentA, currentB)
        const loser = winner === currentA ? currentB : currentA

        rounds.push({
            winner: winner.name,
            loser: loser.name
        })

        if (winner === currentA) {
            indexB++
            currentB = teamB[indexB]
        } else {
            indexA++
            currentA = teamA[indexA]
        }
    }

    const teamAAlive = teamA.length - indexA
    const teamBAlive = teamB.length - indexB

    return {
        rounds,
        result: {
            teamA: {
                alive: teamAAlive,
                defeated: teamA.length - teamAAlive
            },
            teamB: {
                alive: teamBAlive,
                defeated: teamB.length - teamBAlive
            }
        }
    }
}

function fight(a, b) {
    const aSpeed = getStat(a, 'speed')
    const bSpeed = getStat(b, 'speed')

    const first = aSpeed >= bSpeed ? a : b
    const second = first === a ? b : a

    if (canDefeat(first, second)) return first
    if (canDefeat(second, first)) return second

    return first
}

function getStat(pokemon, stat) {
    return pokemon.stats.find(s => s.stat.name === stat).base_stat
}

function canDefeat(attacker, defender) {
    return (
        getStat(attacker, 'attack') >
        getStat(defender, 'defense')
    )
}
