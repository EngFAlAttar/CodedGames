export interface Powerup {
    score: number,
    booster: string,
    incrementAmount: number
}

export const powerups: Powerup[] = [
    {score: 10, booster: "Muscles", incrementAmount: 5},
    {score: 50, booster: "Jet Pack", incrementAmount: 50},
    {score: 5500, booster: "Lifebuoy", incrementAmount: 2},
]