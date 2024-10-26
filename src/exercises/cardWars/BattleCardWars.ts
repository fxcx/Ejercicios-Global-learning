import type { Card, Criatura, Players, CardHability } from '@/types/cardWars'
import { CampGameCardWars } from './CampGameCardWars'

export class BattleCardWars {
  cartasObtenidastoAtack: any
  private readonly _zoneBattle: CampGameCardWars

  constructor (zoneBattle: CampGameCardWars) {
    this._zoneBattle = zoneBattle
    this.cartasObtenidastoAtack = []
  }

  get zonePreparadaBattle (): CampGameCardWars {
    return this._zoneBattle
  }

  // agrega una criatura a la zona de batalla
  addCriatureCamp (cardIndex: number, players: Players): Card<Criatura> {
    if (cardIndex < 0 || cardIndex > players.card.length) console.log(`sus cartas son ${players.card.length}`)

    const criature = players.card[cardIndex]
    this._zoneBattle.zoneBattle().push(criature)
    return criature
  }

  // agrega una habilidad  a la zona de batalla
  addHabilityCards (cardIndex: number, players: Players): CardHability {
    const hability = players.hability
    const aplano = hability.flat()
    const card = aplano[cardIndex]
    this._zoneBattle.zoneBattle().push(card)
    // como que se usa y se borra
    this.zonePreparadaBattle.deletedElementZoneBattle(cardIndex)
    return card
  }

  // la criatura del jugador que hace un ataque, a una criatura enemiga 🚧
  atackCard (player: Players, targetIndex: number): void {
    const criaturasEnZona = this.zonePreparadaBattle.zoneBattle().filter(
      (card): card is Card<Criatura> => 'criatura' in card
    )
    console.log(criaturasEnZona, 'criaturas en zona de batalla')
  }
}
