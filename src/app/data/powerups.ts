export interface Powerup {
    score: number,
    booster: string,
    incrementAmount: number,
    img: string
}

export const powerups: Powerup[] = [
    {score: 10, booster: "Muscles", incrementAmount: 5, img: '/assets/icons/muscle.png'},
    {score: 50, booster: "Jet Pack", incrementAmount: 50, img: '/assets/icons/jetpack.png'},
    {score: 5500, booster: "Lifebuoy", incrementAmount: 2, img: '/assets/icons/lifebouy.png'},
]