import type { Players, Card, Criatura, CardHability } from '@/types/cardWars'

export class PlayersCard {
  player: Players
  constructor (card: Array<Card<Criatura>>, hability: CardHability[], player: Players) {
    this.player = player
    this.player.card = card
    this.player.hability = hability
  }
}
