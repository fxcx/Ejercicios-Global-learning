import type { ICampBattle, Zona, Ecenario, ZoneBattle, CardHability, Card, Criatura, PlayerLimit } from '@/types/cardWars'
import { PlayersCard } from './Players'

export class CampGameCardWars implements ICampBattle {
  playersLimit: PlayerLimit
  zone: Ecenario<Zona>
  energyRound: number = 2
  round: number = 1
  time: number = 15
  private readonly _zoneBattle: ZoneBattle[] = []

  constructor (player1: PlayersCard, player2: PlayersCard, zone: Ecenario<Zona>) {
    this.zone = zone
    this.playersLimit = [player1.player, player2.player]
  }

  zoneBattle (): ZoneBattle[] {
    return this._zoneBattle
  }

  aleatorioTurn (): void {
    const turno = Math.random() < 0.5
    return console.log(turno ? ` ${this.playersLimit[0].playerName}` : `${this.playersLimit[1].playerName}`)
  }

  // agrega una criatura segun el indece que le pasemos a la zona de batalla[]
  addCriatureCamp (cardIndex: number): Card<Criatura> {
    if (cardIndex < 0 || cardIndex > this.playersLimit[0].card.length) throw new Error('Indice invalido')

    const criature = this.playersLimit[0].card[cardIndex]
    this._zoneBattle.push(criature)
    return criature
  }

  // agrega una carta de habilidad a la zona de batalla[]
  addHabilityCards (cardIndex: number): CardHability {
    const hability = this.playersLimit[0].hability
    const aplano = hability.flat()
    const card = aplano[cardIndex]
    this._zoneBattle.push(card)
    return card
  }

  // entre los elemt de los personajes, se define aletoriamente el lugar de la zona de combate
  addEcenarioZone (): ZoneBattle[] {
    const elementoJugador1 = this.playersLimit[0].Personaje.element
    const elementoJugador2 = this.playersLimit[1].Personaje.element

    const zonasFiltradas = this.zone.zonas.filter(zona =>
      zona.element === elementoJugador1 || zona.element === elementoJugador2
    )

    if (zonasFiltradas.length === 0) {
      this._zoneBattle.push(this.zone.zonas[3])
      console.log('zona por defecto')
    }
    const zonaSeleccionada = zonasFiltradas[Math.floor(Math.random() * zonasFiltradas.length)]
    this._zoneBattle.push(zonaSeleccionada)
    console.log(`lugar ${zonaSeleccionada.zonaName} potencia criaturas elemento ${zonaSeleccionada.element}`)
    return this._zoneBattle
  }
}
